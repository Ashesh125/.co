import anime from '../../../node_modules/animejs/lib/anime.es.js';

export function animateHeal(id){
    $(`#${id}-healthBar`).animate({
        width: "100%"
    }, 2500);
}