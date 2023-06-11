$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();

    $("#party-name-btn").click(() => {
        console.log($(".username"));
        let usernames = [$('#username-0'), $('#username-1'), $('#username-2')];
        let party_name = $('#party-name-input').val();
        usernames.forEach((username, index) => {
            console.log(username.val());
            if (username.val().length == 0) {
                alert(username.attr("id"));
            }
        });
        if (party_name.length == 0) {
            alert("tero name khali xa bee");
        } else {
            location.href = "seedGeneration.html";
        }
    });
});