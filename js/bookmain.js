//alert("Your Boookmarks|Your Websites");
//listen for form submit
document.getElementById('myform').addEventListener('submit', saveBookmark);
 
function saveBookmark(e){
	//console.log('it works');
	//es5 syntax
	var sn=document.getElementById('sitename').value;//if we do not write value it will just print the same line(input="text" placeholder="" etc.)
	var surl=document.getElementById('siteurl').value;

// validation part
	if(!sn || !surl){
		alert('Please enter the complete details');
		return false;//if we dont return false, then the bookmark will be added even after alert comes.
	}
	
	var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
var regex = new RegExp(expression);	

if(!surl.match(regex)){
alert('Please use a valid url');
return false;
}

	var bma={
	//this is bookmark array. When we save it/submit to (local storage), it will be saved as an array of objects.
		namea:sn, 
		urla:surl
	}

/*
//local storage test
localStorage.setItem('test','hello');//key,value
console.log(localStorage.getItem('test'));
localStorage.removeItem('test');
console.log(localStorage.getItem('test'));
*/


//we'll chk if theres bookmark in the localstorage or not. If there is, we'll update.
if(localStorage.getItem('bookmarks')===null){//we'll chk for an item called bookmarks & chk for wheather the array is null
	
	var bookmarks=[]; //init array, if the bookmarks is null then we need to initialize the array. 
	bookmarks.push(bma);
localStorage.setItem('bookmarks',JSON.stringify(bookmarks));//this is a json array we need to save it as a string,so wrap it around a functionjson.stringfy	//this will set it to the local storage
}

else{																//this is if there is something in the bookmarks//get bookmarks from local storage.
	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));    //this will turn string into json
	bookmarks.push(bma);            								//add bookmark to array	
	localStorage.setItem('bookmarks',JSON.stringify(bookmarks));	//re-set back to the local storage
}	
document.getElementById('myform').reset(); //reset form (otherwise the sitename and url will still be there even if we add a new website)
//refetch bookmarks - otherwise we'll have to refresh again after addiding
		fetchbkmrk();
	e.preventDefault();//it will prevent the form from being submitted 

}

//delete bookmark
function dltbmk(urla){
//console.log(urla);
		var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));  //get the bookmarks from local storage
		for(var i=0;i<bookmarks.length;i++){
			if(bookmarks[i].urla==urla){
				bookmarks.splice(i,1);	//remove from array
			}
			
		}localStorage.setItem('bookmarks',JSON.stringify(bookmarks));//reset the local storage
		//refetch bookmarks - otherwise we'll have to refresh again after deletion
		fetchbkmrk();
}



//fetch bookmark
function fetchbkmrk(){

	var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
	//console.log(bookmarks);	
	var bmr=document.getElementById('lala');	//get o/p id
	bmr.innerHTML = '';//build o/p
	for(var i=0;i<bookmarks.length;i++){
	// We'll have to only use namea and urla as we used these 2 bma array variables above.

		var namea=bookmarks[i].namea;
		var urla=bookmarks[i].urla;
		bmr.innerHTML += '<div class="well">'+
		'<h3>'+namea+
		' <a class= "btn btn-default" target="_blank" href="'+urla+'">Visit</a>'+
		' <a onclick="dltbmk(\''+urla+'\')" class= "btn btn-danger"  href="#">Delete</a>'
		+'</h3>'+'</div>';


	}

}
