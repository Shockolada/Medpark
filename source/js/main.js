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
    // console.log($(window).width());
    $('.main-nav__link.has-submenu').click(function () {
      event.preventDefault();
      $(this).closest('.main-nav__item').siblings().find('.submenu__icon').removeClass('isOpen');
      $(this).find('.submenu__icon').toggleClass('isOpen');
      $(this).closest('.main-nav__item').siblings().find('.submenu').stop().slideUp(300);
      $(this).closest('.main-nav__item').find('.submenu').stop().slideToggle(300);
    });
  }

  function showSubmenuByHover() {
    // console.log($(window).width());
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


  /* FORM */

  /* FORM SUBMIT BUTTON */
  $('#data-confirm').closest('form').find('button:submit').prop('disabled', true);
  $('#data-confirm').change(function () {
    if ($('#data-confirm').is(':checked')) {
      $(this).closest('form').find('button:submit').prop('disabled', false);
    } else {
      $(this).closest('form').find('button:submit').prop('disabled', true);
    }
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
  /* OPEN NET BLOCK BY CLICK ON CONTINUE */
  $('.tab-content .button-next').click(function () {
    $(this).closest('.donate-step').find('.tab-link').addClass('done');
    $('.progress__point:eq(1)').addClass('done');
    $('.progress__point:eq(2)').addClass('active');
    $(this).closest('.tab-content').stop().slideUp(300);
    $(this).closest('.tab-wrap').next().find('.tab-content').stop().slideDown(300);

    var nextEl = $(this).closest('.tab-wrap').next().find('.tab-content');
    setTimeout(function () {
      var top = nextEl.offset().top - 160;
      $('body, html').animate({
        scrollTop: top
      }, 300);
    }, 300);

    /* SET FIELDS VALUES */
    $('#user-name').text(userName + ' ' + userLastName);
    $('#user-tel').text(userTel);
    $('#user-mail').text(userEmail);
    $('#message-subject').text(subject);
    $('#user-message').text(userMessage);
    $('#payment-summ').text(summ);
    $('#payment-method').text(payMethod);
    $('#payment-frequence').text(payFrequence);
  });

  /* OPEN BLOCK BY HEADER CLICK */
  $('.tab-link').click(function () {
    if ($(this).hasClass('done')) {
      $('.tab-content').stop().slideUp(300);
      $(this).closest('.tab-wrap').find('.tab-content').stop().slideDown(300);

      var nextEl = $(this).closest('.tab-wrap').find('.tab-content');
      setTimeout(function () {
        var top = nextEl.offset().top - 160;
        $('body, html').animate({
          scrollTop: top
        }, 300);
      }, 300);
    }
  });

  /* CONNECT INPUT & CHECKBOX */
  $('.donate-other-summ').change(function () {
    console.log('changed')
    // $('.other-summ').closest('.form__item.hidden').stop().slideUp(200);
    if (this.checked) {
      $('.other-summ').closest('.form__item.hidden').stop().slideDown(200);
      $('.other-summ').focus();
    }
  });
  $('.other-summ').focus(function () {
    if (this.focus) {
      $('.donate-other-summ').prop('checked', true);
    }
  });

  /* GET FIELDS VALUES */
  var summ = $('input[name=summ]:checked').closest('label').text();
  $('input[name=summ]').change(function () {
    summ = $(this).closest('label').text();
    $('.other-summ').val('');
  });

  $('.other-summ').on('.other-summ keyup', function () {
    summ = $(this).val();
  });

  var userName = $('#first-name').val();
  var userLastName = $('#last-name').val();
  var userTel = $('#tel').val();
  var userEmail = $('#mail').val();
  var subject = $('#subject').val();
  var userMessage = $('#message').val();
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