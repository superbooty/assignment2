
$('.accordionMod .accordion-toggle').click(function() {
    if ($(this).parent().parent().find('.accordion-body').is('.in')) {
        $(this).removeClass('current');
        $(this).find('.icon').removeClass('iconActive');
    } else {
        $(this).addClass('current');
        $(this).find('.icon').addClass('iconActive');
    }
    $(this).parent().parent().siblings().find('.accordion-toggle').removeClass('current');
    $(this).parent().parent().siblings().find('.accordion-toggle > .icon').removeClass('iconActive');
});

$('.accordionMod .accordion-toggle').first().trigger('click');