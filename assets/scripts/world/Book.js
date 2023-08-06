export class Book {
    constructor() {

        this.charactersData = JSON.parse(localStorage.getItem("characters"));

    }
    getCharacterData() {

        if (this.charactersData && this.charactersData.length > 0) {
            $('#profile-detail').empty(); // Clear previous content, if any

            this.charactersData.forEach((charactersArray) => {
                charactersArray.forEach((character) => {
                    $('#profile-detail').append(`<div class="profile-info" id="${character.name}">${character.name}</div>`);
                });
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

        this.charactersData.forEach((charactersArray) => {
            charactersArray.forEach((character) => {
                if (character.name === name) {
                    foundCharacter = character;
                }
            });
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
        $('#defence-stat').text(character.stats.defence);

    }
}