const todoEl = document.querySelector('.title .inner .material-icons');
var delTodoEls = document.querySelectorAll('.Todo .inner ul li .material-icons');

todoEl.addEventListener('click', function(){
    var li = document.createElement('li');
    var inputData = document.getElementById('myInput').value;
    var temp = document.createTextNode(inputData);
    li.appendChild(temp);
    if(inputData == ''){
        alert("you must write something!");
    }else{
        document.querySelector('.Todo .inner ul').appendChild(li);
    }
    document.getElementById('myInput').value = "";
    var span = document.createElement("span");
    var simbol = document.createTextNode("clear");
    span.className = "material-icons";
    span.appendChild(simbol);
    li.appendChild(span);
    delTodoEls = document.querySelectorAll('.Todo .inner ul li .material-icons');
    delTodoEls.forEach(function(delTodoEl){
        delTodoEl.addEventListener('click', function(){
            delTodoEl.parentElement.remove();
        })
    })
});
