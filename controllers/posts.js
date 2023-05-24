const cloudinary = require("../middleware/cloudinary");
const Post = require("../models/Post");
const Rec = require("../models/Rec");
const User = require("../models/User");
const Comments = require("../models/comment");
const { getRecommendations } = require("../helpers/openai.js")

module.exports = {
  getProfile: async (req, res) => {
    try {
      console.log(req.query)
      const isABusinessAccount = req.user.accountType === 'business'
      if(isABusinessAccount){
        res.redirect('/business')
      }
      let allReviews = await Post.find();
      if ("hairType" in req.query){
        allReviews = allReviews.filter((review) => review.hairType === req.query.hairType)
        console.log(allReviews)
      }
      
      const users = await User.find();
      const businesses = users.filter((user) => user.accountType === 'business');
      console.log(req.query)
      res.render("customer.ejs", { allReviews, user: req.user, businesses, hairType:req.query.hair });
      
    } catch (err) {
      console.log(err);
    }
  },
  getBusinessProfile: async (req, res) => {
    console.log('getting business profile')
    try {
      const myReviews = await Post.find({businessId: req.user._id});
      const allReviews = await Post.find();
      // ratings equals the medium or average number of each review's ratings
      let average = 1
      if (myReviews.length == 0){ 
        const average = 1
      }
      else {
        const ratings = myReviews.map((review) => review.rating)
         average = ratings.reduce((prev, curr) => prev + curr) / ratings.length
      }
      res.render("business.ejs", { allReviews, user: req.user, myReviews, average });
    } catch (err) {
      console.log(err);
    }
  },
  getPost: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id);
      const comments = await Comments.find({post:post._id}).populate('user');
      res.render("post.ejs", { post: post, user: req.user, comments:comments }) ;
    } catch (err) {
      console.log(err);
    }
  }, 
  createComment: async (req, res) => {
    try {
        console.log(req.body)
      await Comments.create({
        comment: req.body.comment,
        post: req.body.postId,  
        user: req.user.id,
        createdAt: new Date().toLocaleDateString(),
        userName: req.user.userName,
      });
      console.log("Comment has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  }, 


  createReview: async (req, res) => {
    console.log(req.body)
    try {
      // Upload image to cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);
        const businessId = JSON.parse(req.body.business).id
        const business = JSON.parse(req.body.business).name

      await Post.create({
        subject: req.body.title,
        image: result.secure_url ?? null,
        cloudinaryId: result.public_id ?? null,
        description: req.body.description,
        likes: 0,
        user: req.user.id,
        createdAt: new Date().toLocaleDateString(),
        userName: req.user.userName,
        businessId,
        business,
        rating: Number(req.body.rating),
        hairType: req.body.hair,
      });
      console.log("Post has been added!");
      res.redirect("/profile");
    } catch (err) {
      console.log(err);
    }
  }, 

  likePostInNewsfeed: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      res.redirect(`/profile`);
    } catch (err) {
      console.log(err);
    }
  },
  likePost: async (req, res) => {
    try {
      await Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $inc: { likes: 1 },
        }
      );
      res.redirect(`/post/${req.params.id}`);
    } catch (err) {
      console.log(err);
    }
  },
  deletePost: async (req, res) => {
    try {
      // Find post by id
      let post = await Post.findById({ _id: req.params.id });
      // Delete image from cloudinary
      await cloudinary.uploader.destroy(post.cloudinaryId);
      // Delete post from db
      await Post.remove({ _id: req.params.id });
      console.log("Deleted Post");
      res.redirect("/profile");
    } catch (err) {
      res.redirect("/profile");
    }
  },
   createRec: async (req, res) => {
    try {
      const { hair, problems, goals } = req.body;
      const email = req.user.email;
      const userName = req.user.userName;

      await getRecommendations(hair, problems, goals, email, userName)

      await Rec.create({ hair, problems, goals, email, emailStatus: 'sent', sentAt: new Date() });
      res.redirect("/profile");
      console.log('email delivered!')
    } catch (err) {
      console.log(err);
    }
  },
};
