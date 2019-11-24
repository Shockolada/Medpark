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
  /* CONNECT INPUT & CHECKBOX */
  $('.donate-other-summ').change(function () {
    if (this.checked) {
      $('.other-summ').focus();
    }
  });

  $('.other-summ').focus(function () {
    $('.donate-other-summ').prop('checked', true);
  });


  /* VALIDATE FORM */
  $('.donate-step__tab-content input').filter('[required]:visible').change(function () {
    var buttonNext = $(this).closest('.donate-step__tab-content').find('.form__btn');
    if (isEmptyFields()) {
      buttonNext.prop('disabled', false);
      $(this).closest('.donate-step').find('.tab-link').addClass('done');
      $('.progress__point:eq(0)').addClass('done');
      $('.progress__point:eq(1)').addClass('active');
    } else {
      buttonNext.prop('disabled', true);
    }
  });

  $('.donate-step__tab-content input').filter('[required]:visible').keydown(function () {
    var buttonNext = $(this).closest('.donate-step__tab-content').find('.form__btn');
    if (isEmptyFields()) {
      buttonNext.prop('disabled', false);
      $(this).closest('.donate-step').find('.tab-link').addClass('done');
    } else {
      buttonNext.prop('disabled', true);
    }
  });

  function isEmptyFields() {
    var emptyFields = true;
    $('input').filter('[required]:visible').each(function () {
      if ($(this).val() == '') {
        emptyFields = false;
      }
    });
    return emptyFields;
  }


  /* TABS */
  /* ОТКРЫТЬ СЛЕДУЮЩИЙ БЛОК ПРИ КЛИКЕ НА CONTINUE */
  $('.tab-content .button-next').click(function () {
    $(this).closest('.donate-step').find('.tab-link').addClass('done');
    $('.progress__point:eq(1)').addClass('done');
    $('.progress__point:eq(2)').addClass('active');
    $(this).closest('.tab-content').stop().slideUp(300);
    $(this).closest('.tab-wrap').next().find('.tab-content').stop().slideDown(300);

    /* PUT FIELDS VALUES */
    $('#user-name').text(userName);
    $('#user-tel').text(userTel);
    $('#user-mail').text(userEmail);
    $('#user-address').text(subject);
    $('#user-message').text(userMessage);
    $('#payment-summ').text(summ);
    $('#payment-method').text(payMethod);
    $('#payment-frequence').text(payFrequence);
  });

  /* ОТКРЫТЬ БЛОК ЕСЛИ КЛИК ПО ЕГО ХЭДЕРУ */
  $('.tab-link').click(function () {

    if ($(this).hasClass('done')) {
      $('.tab-content').stop().slideUp(300);
      $(this).closest('.tab-wrap').find('.tab-content').stop().slideDown(300);
    }
  });

  /* GET FIELDS VALUES */
  var summ = $('input[name=summ]:checked').closest('label').text();
  $('input[name=summ]').change(function () {
    summ = $(this).closest('label').text();
    if ($('.donate-other-summ').is(':checked')) {
      summ = $('.other-summ').val();
    }
    return summ;
  });

  var userName = $('#first-name').val();
  var userLastName = $('#last-name').val();
  var tel = $('#tel').val();
  var email = $('#mail').val();
  var subject = $('#subject').val();
  var message = $('#message').val();
  $('#first-name').change(function () {
    userName = $('#first-name').val();
  });
  $('#last-name').change(function () {
    userLastName = $('#last-name').val();
  });
  $('#tel').change(function () {
    userTel = $('#tel').val();
  });
  $('#mail').change(function () {
    userEmail = $('#mail').val();
  });
  $('#subject').change(function () {
    subject = $('#subject').val();
  });
  $('#message').change(function () {
    userMessage = $('#message').val();
  });

  var payMethod = $('input[name=payment-method]:checked').closest('label').text();
  $('input[name=payment-method]').change(function () {
    payMethod = $('input[name=payment-method]:checked').closest('label').text();
  });

  var payFrequence = $('input[name=payment-frequence]:checked').closest('label').text();
  $('input[name=payment-frequence]').change(function () {
    payFrequence = $('input[name=payment-frequence]:checked').closest('label').text();
  });

});