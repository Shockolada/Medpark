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
    $('.main-nav__link.has-submenu').click(function () {
      event.preventDefault();
      // $(this).off('mouseenter mouseleave');
      $(this).closest('.main-nav__item').siblings().find('.submenu__icon').removeClass('active');
      $(this).find('.submenu__icon').toggleClass('active');
      $('.submenu').stop().slideUp(300);
      $(this).closest('.main-nav__item').find('.submenu').stop().slideToggle(300);
    });
  }

  function showSubmenuByHover() {
    $('.main-nav__link.has-submenu').mouseenter(function () {
      // $(this).off('click');
      $(this).addClass('hover');
      $('.submenu__icon').addClass('active');
      $(this).find('.submenu__icon').addClass('active');
      $(this).closest('.main-nav__item').find('.submenu').stop().slideDown(300);
    });
    $('.main-nav__item').mouseleave(function () {
      $('.submenu__icon').removeClass('active');
      $(this).find('.main-nav__link.has-submenu').removeClass('hover');
      $(this).find('.submenu__icon').removeClass('active');
      $(this).find('.submenu').stop().slideUp(300);
    });
  }

  if ($(window).width() < 940) {
    showSubmenuByClick();
  } else if ($(window).width() >= 940) {
    showSubmenuByHover();
  }

  // submenuBehavior();
  $(window).resize(function () {
    if ($(window).width() < 940) {
      $('.main-nav__link.has-submenu').off('mouseenter mouseleave');
      showSubmenuByClick();
    } else if ($(window).width() >= 940) {
      $('.main-nav__link.has-submenu').off('click');
      showSubmenuByHover();
    }
  });

});