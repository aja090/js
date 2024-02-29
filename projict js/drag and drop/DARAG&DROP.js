let input = document.getElementById('inp');
let btn = document.getElementById('btn');
let boxes = document.querySelectorAll('.box');
let drag = null;

btn.onclick = () => {
    if (input.value != '') {
        boxes [0].innerHTML += `
        
        <p class ="item" draggable= "true" > ${inp.value} </p>
        
        `
        input.value = '';
    }

    dragItem ();
}

function dragItem() {
    let items = document.querySelectorAll('.item');
    items.forEach(item => {
        item.addEventListener('dragstart', () => {
            drag = item;
            item.style.opacity = "0.5";
            })

        item.addEventListener('dragend', () => {
            drag = null;
            item.style.opacity = "1";
            })

            boxes.forEach(box=>{
                box.addEventListener('dragover', function (e) {
                        e.preventDefault;
                        box.style.background = "#090";
                        box.style.color = "#fff";
                    })

                box.addEventListener('dragleave', () => {
                    box.style.background = "#fff";
                    box.style.color = "#000";
                })

                box.addEventListener('drop', () => {
                    box.append(drag);
                    box.style.background = "#fff";
                    box.style.color = "#000";
                })
            })
    })
}