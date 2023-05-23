// const openModalbtn = document.querySelector('.createbtn')
// const background = document.querySelector(".modal-background"); 
// const modalContainer = document.querySelector('#modal-container');
let bio = document.querySelector(".bio");
const bioMore = document.querySelector("#see-more-bio");
const bioLength = bio.innerText.length;

// openModalbtn.addEventListener('click', openModal)

// function openModal(){
//   console.log('opening modal...')
//   const buttonId = this.getAttribute('id');
//   console.log(buttonId)
//   const modalContainer = document.querySelector('#modal-container');
//   modalContainer.removeAttribute('class');
//   modalContainer.classList.add(buttonId);
//   document.body.classList.add('modal-active');
// }

// modalContainer.addEventListener('click', function(e) {
//   const clickedBackground = e.target == background;
//   if (clickedBackground) {
//     this.classList.add('out');
//     document.body.classList.remove('modal-active');
//   }
// });

document.querySelectorAll(".nav ul li").forEach(function(item) {
  item.addEventListener("click", function() {
    this.classList.add("active");
    Array.from(this.parentNode.children).forEach(function(sibling) {
      if (sibling !== item) {
        sibling.classList.remove("active");
      }
    });
  });
});
// tabs newsfeed and recc
const tabBtn = document.querySelectorAll(".nav ul li");
const tab = document.querySelectorAll(".tab"); // 2 elements only 

function tabs(panelIndex) {
  tab.forEach(function(node) {
    node.style.display = "none";
  });
  tab[panelIndex].style.display = "flex";
}
tabs(0);



function bioText() {
  bio.oldText = bio.innerText;
  const hairFilter = document.getElementById("hair-filter-read")
  console.log(`we love hair ${hairFilter}`)
  hairFilter.addEventListener("change", handleHairFilterChange)

  bio.innerText = bio.innerText.substring(0, 100) + "...";
  bio.innerHTML += "<span onclick='addLength()' id='see-more-bio'>See More</span>";
}

bioText();
console.log("hairFilter")
function addLength() {  
  console.log("hairFilter")
  bio.innerText = bio.oldText;
  bio.innerHTML += "&nbsp;" + "<span onclick='bioText()' id='see-less-bio'>See Less</span>";
  document.getElementById("see-less-bio").addEventListener("click", function() {
    document.getElementById("see-less-bio").style.display = "none";
  });
}

if (parseInt(document.querySelector(".alert-message").innerText) > 9) {
  document.querySelector(".alert-message").style.fontSize = ".7rem";
} 
// function hairFilter (){
//   const hairFilter = document.getElementById("hair-filter-read")
//   console.log(`we love hair ${hairFilter}`)
//   hairFilter.addEventListener("change", handleHairFilterChange 
//   );
// }
function handleHairFilterChange (event){
  console.log("hair-filter-read");
  let hairType = event.target.value
  console.log(hairType)
  const elements = document.getElementsByClassName("post");
  console.log(elements) 
  

  window.location.href=`/profile?hairType=${hairType}`
  const hairFilter = document.getElementById("hair-filter-read");
  hairFilter.value = hairType;
}
 

 
