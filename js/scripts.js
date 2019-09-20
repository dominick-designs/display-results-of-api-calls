// install the Live Server extension in VSCode by Ritwick Dey. then right-click on index.html and "open with live server"

/**search for the following urls as the argument for the performSearch function
 * https://api.github.com/orgs/boomtownroi
 * https://api.github.com/orgs/BoomTownROI/repos
 * https://api.github.com/orgs/BoomTownROI/events
 * https://api.github.com/orgs/BoomTownROI/hooks
 * https://api.github.com/orgs/BoomTownROI/issues
 * https://api.github.com/orgs/BoomTownROI/members%7B/member%7D
 * https://api.github.com/orgs/BoomTownROI/public_members%7B/member%7D
 * https://avatars3.githubusercontent.com/u/1214096?v=4
 */

/** 1. Output Data:
- Follow all urls containing "api.github.com/orgs/BoomTownROI" in the path, and for responses with a 200 status code, retrieve and display all 'id' keys/values in the response objects. For all non-200 status codes, give some indication of the failed request. HINT: Devise a way for the end user to make sense of the id values, related to the original resource route used to retrieve the data.
*/
class ObjectOriented {

    //this method will yeild create_at date verification
    performSearch(allData) {
        fetch(allData)
            .then(this.handleErrors)
            .then(response => response.json())
            .then(data => {
                let allData = data;

                const getUlElement = document.querySelector("ul");
                const logResultsYounger = document.createElement("div");
                logResultsYounger.innerHTML = `<h2>The results of comparing created_at & updated_at:` + `<h3>The created_at date is younger than the updated_at date </h3>`;

                const logResultsOlder = document.createElement("div");
                logResultsOlder.innerHTML = `<h2>The results of comparing created_at & updated_at:` + `<h3>The created_at date is older than the updated_at date </h3>`;


                if (allData.created_at < allData.updated_at) {
                    getUlElement.appendChild(logResultsYounger);
                    console.log("The created_at date is younger than the updated_at date ");
                } else {
                    getUlElement.appendChild(logResultsOlder);
                    console.log("The created_at date is older than the updated_at date ");
                }
                return allData.repos_url;
            })
    }

    //  this method will return length of items in array from response
    performSearch1(allData) {
        fetch(allData)
            .then(this.handleErrors)
            .then(response => response.json())
            .then(data => {
                let allData = data;
                console.log(allData.length);
                return allData.length;
            })
    }

    performSearch2(allData) {
        fetch(allData)
            .then(this.handleErrors)
            .then(response => response.json())
            .then(data => {
                let allData = JSON.parse(JSON.stringify(data));
                //map tip from https://hashnode.com/post/whats-the-best-way-to-map-over-an-objectarray-in-javascript-es6-ciw5ymwxd00ifg253ffphxnne
                Object.entries(allData).forEach(([key, value]) => {

                    const results = document.querySelector('#list');

                    const listOfKeys = document.createElement('p');
                    const listOfValues = document.createElement('p');

                    listOfKeys.innerHTML = "This is the key: " + key;
                    listOfValues.innerHTML = "This is the value: " + value;

                    listOfKeys.appendChild(listOfValues);
                    results.appendChild(listOfKeys);

                    return key, value;
                });

            })
    }
    // handle not "ok" error on request to api
    handleErrors(response) {
        if (!response.ok) {
            const results = document.querySelector('#list');
            const listOfResults = document.createElement('div');
            results.innerHTML = `<h1>OOPS! Looks there was an error. Here's the error message: ${Error(response.statusText)}</h1>`;
            results.appendChild(listOfResults);

            throw Error(response.statusText);
        }
        return response;
    }
    // compare repo counts
    compareRepoCount() {
        if (this.performSearch1 != this.performSearch) {
            const getUlElement = document.querySelector("ul");
            const logResults = document.createElement("div");
            logResults.innerHTML = `<h2>The results of comparing repo counts: </h2>` + `<h3> The "public_repos" is not equal to the number of repos in the "repos_url" </h3>`;

            getUlElement.appendChild(logResults);
            console.log('The "public_repos" is not equal to the number of repos in the "repos_url"');
        }
    }
}

// 2. Perform Verifications:

//- On the top-level BoomTownROI organization details object, verify that the 'updated_at' value is later than the 'created_at' date.
const testCreatedOnDate = new ObjectOriented();
testCreatedOnDate.performSearch("https://api.github.com/orgs/BoomTownROI/events")

//- On the top-level details object, compare the 'public_repos' count against the repositories array returned from following the 'repos_url', verifying that the counts match. HINT: The public repositories resource only returns a default limit of 30 repo objects per request.
const compareCounts = new ObjectOriented();
compareCounts.compareRepoCount();

/** create and append search form to DOM */
const searchContainer = document.querySelector('.search-container');
// add html markup to DOM in one chunk
const form = `
        <form action="#" method="get">
               <input type="search" id="search-input" class="search-input" placeholder="Search...">
                <input type="submit" value="&#x1F50D;" id="serach-submit" class="search-submit">
       </form>
`;
searchContainer.innerHTML = form;
const tagForm = document.querySelector('form');

// listen to event on the search form
tagForm.addEventListener('submit', (e) => {
    // declare variables for search input and cards
    const searchFormInput = document.getElementById('search-input');
    const searchValue = searchFormInput.value;

    const searchWithAPI = new ObjectOriented();
    document.getElementById("list").innerHTML = "";
    searchWithAPI.performSearch2(searchValue);

});


