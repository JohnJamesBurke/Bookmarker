// Listen for form submit
document.getElementById("myForm").addEventListener('submit', saveBookmark);

// Save the boomark to local storage
function saveBookmark(e){
     
    // Get form values
    let siteName = document.getElementById("siteName").value;
    let siteURL = document.getElementById("siteURL").value;
    let siteDescription = document.getElementById("siteDescription").value;
    
    //console.log(siteName + '-' + siteURL);
    if (!validateForm(siteName,siteURL)){
        return false;
    }
    

    // Bookmark object
    let bookmark = {
        name: siteName,
        url: siteURL,
        desc: siteDescription
    }

    // local storage examples
    // localStorage.setItem('test', "hello world");
    // console.log(localStorage.getItem('test'));
    // localStorage.removeItem('test');


    // Save bookmark to local storage

    // Test if bookmarks exists
    if(localStorage.getItem('bookmarks') === null){
        // Init array
        let bookmarks = [];

        // Add to array
        bookmarks.push(bookmark);

        // Set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from local storage
        let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // Add bookmark to array
        bookmarks.push(bookmark);

        // update local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    // Clear form
    document.getElementById('myForm').reset();

    // Refreh the bookmarks display
    fetchBookmarks();

    // prevent form submit
    e.preventDefault();
}

// Delete bookmark
function deleteBookmark(url){
    //console.log(url);

    // get bookmarks from Local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    // loop through until we find url and remove 
    for (let i = 0; i < bookmarks.length; i++){
        if(bookmarks[i].url == url){
            // Remove from array
            bookmarks.splice(i,1);
            break;
        }

    }

     // Save the localStorage
     localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

     // Refreh the bookmarks display
     fetchBookmarks();

}

// Fetch Bookmarks
function fetchBookmarks(){
    // get bookmarks from local storage
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    //console.log(bookmarks);

    // Get the output div 
    let bookmarkResults = document.getElementById('bookmarkResults');

    // build output
    bookmarkResults.innerHTML = '';


    for(let i = 0; i < bookmarks.length; i++){
        //console.log(bookmarks[i]);

        let name = bookmarks[i].name;
        let url = bookmarks[i].url;
        let desc = bookmarks[i].desc;

        

        bookmarkResults.innerHTML += '<div class="card bg-light mb-3">' +
                                    '<div class="card-body">' + 
                                    '<h5 class="card-title">' + 
                                    name + 
                                    '</h5>' + 
                                    '<div class="card-text">' + desc + 
                                    '</div>' + 
                                    '</div>' + 
                                    '<div class="card-footer">' + 
                                    ' <a class="btn btn-dark" target="_blank" href="' + url + '">Visit</a> ' +
                                    ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
                                    '</div>'
    }

}

// Validate form
function validateForm(siteName, siteURL){
    if(!siteName || !siteURL){
        alert('Please fill in the form');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteURL.match(regex)){
        alert('Please use a valid url');
        return false;
    }
    
    return true;
}