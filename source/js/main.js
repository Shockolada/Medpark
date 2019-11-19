$(document).ready(function () {
  /* MENU */
  $('.menu__btn').click(function () {
    event.preventDefault();
    $('body').addClass('no-scroll');
    $('.menu').toggleClass('active');
    $(this).toggleClass('active');
    $('.page-header__langs').toggleClass('active');
  });


  /* SUBMENU */
  $('.main-nav__link.has-submenu').click(function () {
    event.preventDefault();
  });

  function showSubmenuByClick() {
    console.log($(window).width());
    $('.main-nav__link.has-submenu').click(function () {
      event.preventDefault();
      $(this).closest('.main-nav__item').siblings().find('.submenu__icon').removeClass('isOpen');
      $(this).find('.submenu__icon').toggleClass('isOpen');
      $(this).closest('.main-nav__item').siblings().find('.submenu').stop().slideUp(300);
      $(this).closest('.main-nav__item').find('.submenu').stop().slideToggle(300);
    });
  }

  function showSubmenuByHover() {
    console.log($(window).width());
    $('.main-nav__link.has-submenu').mouseenter(function () {
      $(this).addClass('isOpen');
      $(this).find('.submenu__icon').addClass('isOpen');
      $(this).closest('.main-nav__item').find('.submenu').stop().slideDown(300);

      $(this).closest('.main-nav__item').mouseleave(function () {
        $(this).find('.main-nav__link.has-submenu').removeClass('isOpen');
        $(this).find('.submenu__icon').removeClass('isOpen');
        $(this).find('.submenu').stop().slideUp(300);
      });
    });
  }

  if ($(window).width() < 940) {
    showSubmenuByClick();
  } else if ($(window).width() >= 940) {
    showSubmenuByHover();
  }

  $(window).resize(function () {
    // $('.main-nav__link.has-submenu').attr("style", "");
    if ($(window).width() < 940) {
      $('.main-nav__link.has-submenu').off('mouseenter');
      $('.main-nav__item').off('mouseleave');
      showSubmenuByClick();
    } else if ($(window).width() >= 940) {
      $('.main-nav__link.has-submenu').off('click');
      showSubmenuByHover();
    }
  });

});