const selectBox = document.querySelector(".select-box"),
	selectXbtn = selectBox.querySelector(".playerx"),
	selectObtn = selectBox.querySelector(".playero"),
	playboard = document.querySelector(".play-board"),
	allbox=document.querySelectorAll("section span"),
	resultbox= document.querySelector(".result-box"),
	wontext=resultbox.querySelector(".won-text"),
	replaybtn=resultbox.querySelector("Button"),
	players=document.querySelector(".players");
window.onload = ()=> {
	for(let i=0;i<allbox.length;i++){
		allbox[i].setAttribute("onclick","clickedbox(this)");
	}

	selectXbtn.onclick = ()=> {
		selectBox.classList.add("hide");
		playboard.classList.add("show");
		playboard.classList.remove("hide");
	}

	selectObtn.onclick = ()=> {
		selectBox.classList.add("hide");
		playboard.classList.add("show");
		playboard.classList.remove("hide");
		players.setAttribute("class","players active player");
	}
}

let playerXIcon = "fas fa-times"; 
let playerOIcon = "far fa-circle";
let playersign="X";
let runbot=true;

// user click function

 function clickedbox(element) {

 	if (players.classList.contains("player")) {
 		element.innerHTML =`<i class="${playerOIcon}"></i>`;
 		players.classList.add("active");
 		playersign="O";
 		element.setAttribute("id",playersign);
 	}
 	else{
 		element.innerHTML =`<i class="${playerXIcon}"></i>`;	
 		players.classList.add("active");
 		element.setAttribute("id",playersign);
 	}
 	selectWinner();
 	playboard.style.pointerEvents="none";
 	element.style.pointerEvents="none";
 	let randomdelaytime =((Math.random()*1000)+200).toFixed();

 	setTimeout(()=>{
 		bot(runbot);
 	},randomdelaytime);
 }

 // bot click function

 function bot(runbot){
 	if(runbot){
 		playersign="O";
 	let array = [];
 	for(let i = 0; i < allbox.length;i++){
 		if(allbox[i].childElementCount==0){
 			array.push(i);
 		}
 	}
 	let randombox=array[Math.floor(Math.random()*array.length)];
 	if(array.length>0){
 		if (players.classList.contains("player")) {
 		allbox[randombox].innerHTML =`<i class="${playerXIcon}"></i>`;
 		players.classList.remove("active");
 		playersign="X";
 		allbox[randombox].setAttribute("id",playersign);
 	}
 	else{
 		allbox[randombox].innerHTML =`<i class="${playerOIcon}"></i>`;	
 		players.classList.remove("active"); 
 		allbox[randombox].setAttribute("id",playersign);
 	}
 	selectWinner();
 	}
 	playboard.style.pointerEvents="auto";
 	allbox[randombox].style.pointerEvents="none";
 	playersign="X";
 	}

 }

function getid(idname){
	return document.querySelector(".box"+idname).id;

}
function checkids(val1,val2,val3,sign){
	if(getid(val1)==sign && getid(val2)==sign && getid(val3)==sign){
		return true;  
	}
}

function selectWinner(){ 
    if(checkids(1,2,3,playersign) || checkids(4,5,6, playersign) || checkids(7,8,9, playersign) ||
     checkids(1,4,7, playersign) || checkids(2,5,8, playersign) || checkids(3,6,9, playersign) || checkids(1,5,9, playersign) || checkids(3,5,7, playersign)){

    	runbot=false;
    	bot(runbot);

    	setTimeout(()=>{
    		playboard.classList.remove("show");
    		playboard.classList.add("hide");
    		resultbox.classList.add("show");
    	},700);

    	wontext.innerHTML = `Player <p>${playersign}</p> won the game!`;
    }
    else{
    
    	if(getid(1)!="" &&  getid(2)!="" && getid(3)!="" && getid(4)!="" && getid(5)!="" && getid(6)!="" && getid(7)!="" && getid(8)!="" && getid(9)!=""){

	    	runbot=false;
	    	bot(runbot);

	    	setTimeout(()=>{
	    		playboard.classList.remove("show");
	    		playboard.classList.add("hide");
	    		resultbox.classList.add("show");
	    	},700);

	    	wontext.innerHTML = `Match has Drawn!`;
	    }

    }
}

replaybtn.onclick=()=>{
	window.location.reload();
}