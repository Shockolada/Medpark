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

  /* SEARCH */
  $('.page-header__search').click(function () {
    $('body, html').addClass('no-scroll');
    $('.search__area').fadeIn(400);

    $('.search__close-btn').click(function () {
      $('body, html').removeClass('no-scroll');
      $('.search__area').fadeOut(400);
    });
  });

  /* VIDEO */
  $('.text-content iframe').wrap("<div class='text-content__video'></div>");
  $('.text-content__video').wrap("<div class='text-content__video-wrap'></div>")

  /* FORM BUTTON */
  $('#data-confirm').closest('form').find('button:submit').prop('disabled', true);
  $('#data-confirm').change(function () {
    if ($('#data-confirm').is(':checked')) {
      $(this).closest('form').find('button:submit').prop('disabled', false);
    } else {
      $(this).closest('form').find('button:submit').prop('disabled', true);
    }
  });

  /* FORM */
  $('.donate-other-summ').change(function () {
    if(this.checked) {
      $('.other-summ').focus();
    }
  });
});