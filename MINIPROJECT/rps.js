function pickComputerMove(){
    let randomMove=Math.random();
    let Computermove='';
    if(randomMove>=0 && randomMove<1/3){
        Computermove='rock';
    }else if(randomMove>=1/3 && randomMove<2/3){
        Computermove='paper';
    }else if(randomMove>=2/3 && randomMove<1){
        Computermove='scissors';

    }
    return Computermove;
}

let score=JSON.parse(localStorage.getItem('score'))||
{
    wins:0,
    losses:0,
    ties:0
};

updateScore();

function updateScore(){
    document.querySelector('.score').innerHTML=`
    wins:${score.wins} Losses:${score.losses} Ties:${score.ties}`;
}


document.querySelector('.js-rock').addEventListener('click',()=>{
    playGame('rock');
});
document.querySelector('.js-paper').addEventListener('click',()=>{
    playGame('paper');
});
document.querySelector('.js-scissors').addEventListener('click',()=>{
    playGame('scissors');
})



function playGame(playerMove){
    let Computermove=pickComputerMove();
    let result='';
    if(playerMove==='rock'){
        if(Computermove==='rock'){
            result='tie';
        } else if(Computermove==='paper'){
            result='You lose';
        } else if(Computermove==='scissors'){
            result='You win';
        }
    }
    if(playerMove==='paper'){
        if(Computermove==='paper'){
            result='tie';
        } else if(Computermove==='rock'){
            result='You win';
        } else if(Computermove==='scissors'){
            result='You lose';
        }
    }
    if(playerMove==='scissors'){
        if(Computermove==='scissors'){
            result='tie';
        } else if(Computermove==='paper'){
            result='You win';
        } else if(Computermove==='rock'){
            result='You lose';
        }
    }
    if(result==='You win'){
        score.wins+=1;
    } else if(result==='You lose'){
        score.losses+=1;
    }else if(result==='tie'){
        score.ties+=1;
    }

    localStorage.setItem('score',JSON.stringify(score));
    updateScore();
    document.querySelector('.result').innerHTML=result;
    document.querySelector('.moves').innerHTML=`
    You picked ${playerMove} Computer picked ${Computermove} RESULT ${result}`
}

document.querySelector('.reset-btn').addEventListener('click',()=>{
    score.wins=0;
    score.losses=0;
    score.ties=0;
    localStorage.removeItem('score');
    updateScore();
    document.querySelector('.result').innerHTML='';
    document.querySelector('.moves').innerHTML='';

    clearInterval(intervalId);
    isautoplaying=false;
});

let isautoplaying=false;
let intervalId;
function autoplay(){
    if(!isautoplaying){
        intervalId=setInterval(()=>{
            const playerMove=pickComputerMove();
            playGame(playerMove);
        },800);
        isautoplaying=true;
    }else{
        clearInterval(intervalId);
        isautoplaying=false;
    }
};

document.querySelector('.autoplay').addEventListener('click',()=>{
    autoplay();

})