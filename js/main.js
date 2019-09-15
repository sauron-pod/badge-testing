"use strict";

{

    const displayProfile = someUsername => {
        return fetch(`https://api.github.com/users/${someUsername}/events/public`, {headers: {'Authorization': `token ${gitHubKey}`}})
            .then(response => {
                return response.json();
            })
            .then(data => {
                const profileImage = data[0].actor.avatar_url;


                // Define date of last push
                const lastCommit = data.filter(data => data.type === "PushEvent")[0].created_at;
                const lastCommitDate = new Date(lastCommit).getDate();
                const lastCommitMonth = new Date(lastCommit).getMonth();
                const lastCommitYear = new Date(lastCommit).getFullYear();
                // console.log(lastCommitDate);


                // Define today's date
                const today = Date.now();
                const todayDate = new Date(today).getDate();
                const todayMonth = new Date(today).getMonth();
                const todayYear = new Date(today).getFullYear();

                // Console today's date
                // console.log(`Today is ${todayMonth}-${todayDate}-${todayYear}`);





                let html = `<div>`;
                html += `<h1>${someUsername}</h1>`;
                html += `<img style='width:200px;height:200px' src='${profileImage}'>`;
                html += `<p>Today is: ${todayMonth}-${todayDate}-${todayYear}</p>`;
                html += `<p>Last push on: ${lastCommitMonth}-${lastCommitDate}-${lastCommitYear}</p>`;
                html += `</div>`;
                $("#root").append(html);
                return data;
                // return data.filter(data => data.type === "PushEvent")[0].created_at;
            })
            .catch(error => {
                alert('Oh no! Something went wrong.\nCheck the console for details.');
                console.log(error);
            });
    };

    console.log(displayProfile("cadenajohn85"));

}