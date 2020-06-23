const blog = () => {
  let cardsHide = document.querySelectorAll('.blog__item:nth-child(n+8)');
  cardsHide.forEach(function (el) {
    el.classList.add('invisible');
  });
  document.querySelector('.show-posts').addEventListener('click', function () {
    this.style="display:none"
    cardsHide.forEach(function (el) {
      el.classList.remove('invisible');
    });
  });
};
export default blog;
