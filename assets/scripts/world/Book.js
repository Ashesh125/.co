export class Book {
    constructor() {
        this.charactersData = JSON.parse(localStorage.getItem("characters"));
        this.getCharacterData();
    }
    getCharacterData() {
        $('.profile-info').off('mouseenter mouseleave');
        if (this.charactersData && this.charactersData.length > 0) {
            $('#profile-detail').empty(); // Clear previous content, if any
            $('#profile-info').empty();
            $(".character-list-2").empty();
            
            this.charactersData.forEach(character => {
                $('#profile-detail').append(`<div class="profile-info" id="${character.name}">${character.name}</div>`);
                $('.character-list-2').append(`<li class="character-item p-2" data-character-id="${character.id}">
                    <div class="d-flex healthBar">
                        <div class="profile-info"></div>
                        <div class="d-flex flex-column pt-2 w-75">
                        <div class="progress" role="progreissbar" aria-label="Basic example" aria-valuenow="${(character.stats.currentHp / character.stats.health) * 100}" aria-valuemin="0" aria-valuemax="100">
                            <div class="progress-bar bg-danger" id="${character.id}-healthBar" style="width: ${(character.stats.health > 0 ? (character.stats.currentHp / character.stats.health) * 100 : 0)}%"></div>
                         </div>
                        <div>
                            <span>${character.stats.health}</span>/<span id="${character.id}-healthValue">${character.stats.currentHp}</span></div>
                        </div>
                        </div>
                    </li>`);
            });
            $('.profile-info').hover(
                (event) => {
                    const name = $(event.currentTarget).attr('id');
                    const character = this.findCharacterByName(name);
                    console.log(character);
                    if (character) {
                        this.displayCharacterDetails(character);
                    }
                },
                () => {
                    // Hide character details on mouseout
                    $('#profile-details').empty();
                }
            );

            
                

        } else {
            $('#profile-info').text("No character data found.");
        }
    }

    findCharacterByName(name) {
        let foundCharacter = null;

        this.charactersData.forEach((character) => {
            if (character.name === name) {
                foundCharacter = character;
            }
        });

        return foundCharacter;
    }

    displayCharacterDetails(character) {
        $('.profile-img').text(character.name);
        $('#username').val(character.name);
        $('#gender').val(character.gender);
        $('#class-name').val(character.class);
        $('#attack-stat').text(character.stats.attack);
        $('#crit-stat').text(character.stats.crit);
        $('#luck-stat').text(character.stats.luck);
        $('#health-stat').text(character.stats.health);
        $('#speed-stat').text(character.stats.speed);
        $('#defense-stat').text(character.stats.defense);

    }
}