const addTodoEl = document.querySelector('.title .inner .material-icons');
const input = document.getElementById('myInput');

function getInput(){
    var li = document.createElement('li');
    var inputData = document.getElementById('myInput').value;
    var temp = document.createTextNode(inputData);
    li.appendChild(temp);
    if(inputData == ''){
        alert("you must write something!");
    }else{
        document.getElementById('myInput').value = "";
        var span = document.createElement("span");
        var simbol = document.createTextNode("clear");
        span.className = "material-icons";
        span.appendChild(simbol);
        span.addEventListener('click', function(){
            span.parentElement.remove();
        })
        li.appendChild(span);
        li.addEventListener('click', function(){
            if(li.classList.contains('checked')){
                li.classList.remove('checked');
            }else{
                li.classList.add('checked');
            }
        });
        document.querySelector('.Todo .inner ul').appendChild(li);
    }
}

input.addEventListener('keypress', function(key){
    if(key.key == 'Enter'){
        getInput();
    }
})

addTodoEl.addEventListener('click', function(){
    getInput();
});
