import { $ } from './extjs';

export default function toggleStartScreen() {
    if ($('#start_screen').hasClass('hidden')) {
        $('#start_screen').removeClass('hidden');
        $('#start_screen').css('display', 'block');
    } else {
        const hide = () => {
            if ($('#start_screen').hasClass('hidden'))
                if (
                    window.getComputedStyle(
                        document.getElementById('start_screen')
                    ).opacity != '0'
                ) {
                    requestAnimationFrame(hide);
                } else {
                    $('#start_screen').css('display', 'none');
                }
        };
        $('#start_screen').addClass('hidden');
        hide();
    }
}
