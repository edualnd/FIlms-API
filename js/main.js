const cardList = document.querySelector('.card-list')
const addBtn = document.getElementById('addBtn')
addBtn.addEventListener('click', ()=>{
    openModal('addFilm')
})
const library = async () => {
    cardList.innerHTML = ''
    await fetch('http://localhost:3000/list')
    .then(res => res.json())
    .then(data => {
        data.forEach(element => {
            const id = element.title.replaceAll(' ','')
            const idControls = id+'Controls'
            const exist = document.getElementById(id)
            if(exist == null){
            cardList.innerHTML += `<div class="card" id='${id}'>
                <div class="img-film">
                    <img src="${element.imgUrl}" alt="Logo do filme">
                </div>
                
                <div class="info">
                    <p>Title:<span>${element.title}</span></p>
                    <p>Year: <span>${element.year}</span></p>
                    <p>Description: <span>${element.description}</span></p>
                </div>
                <img src="./imgs/setting.svg" alt="Configurações" onclick="openSettings('${idControls}')" class="settings">
                <div class="controls" id="${idControls}">
                    <button onclick="getCard('${id}')">Apagar</button>
                    <button class='update' onclick="cardData(event)">Atualizar</button>
                </div>
                `
            }
        });
        
    })
}

library()

function openModal(id){
    const modal = document.getElementById(id)
    return modal.style.display = 'flex'
}
function closeModal(id, event){
    const modal = document.getElementById(id)
    if(event?.target?.className === 'modal'){
        return modal.style.display = 'none'
    } else if(event === null){
        return modal.style.display = 'none'
    }
}

function openSettings(id){
    const controls = document.getElementById(id)
    return controls.classList.toggle('open')
}
const addForm = document.getElementById('addForm')

addForm.addEventListener('submit', (event)=>{
    addCard(event)
})
async function addCard(event){
    event.preventDefault()
    const form = event.target.closest('form')
    const imgValue = form.querySelector('#imagem').value
    const titleValue = form.querySelector('#title').value
    const yearValue = form.querySelector('#year').value
    const descriptionValue = form.querySelector('#description').value
    const id = titleValue.replaceAll(' ','')
   
    closeModal('addFilm', null)
    event.target.reset()
    const data = {
        imgUrl: imgValue,
        title: titleValue,
        year: Number(yearValue),
        description: descriptionValue
    }
    const apiPost = async () => {
        await fetch('http://localhost:3000/create', {
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    }
    await apiPost()
    library()
}
function cardData(event){
    const card = event.target.closest('.card')
    // Card Values
    
    const img = card.querySelector(`.img-film img`)
    const title = card.querySelector(`.info p:first-of-type span`)
    const year = card.querySelector(`.info p:nth-child(2) span`)
    const description = card.querySelector(`.info p:last-child span`)
    
    const imgValue = document.getElementById('imagemUpdate')
    const titleValue = document.getElementById('titleUpdate')
    const yearValue = document.getElementById('yearUpdate')
    const descriptionValue = document.getElementById('descriptionUpdate')
        imgValue.value = img.getAttribute('src')
        titleValue.value = title.textContent
        yearValue.value = year.textContent
        descriptionValue.value = description.textContent
        openModal('updateFilm')
    const oldData = {
        card,
        img,
        title,
        year,
        description
    }
    const sendUpdate = document.getElementById('updateFilm')
    sendUpdate.addEventListener('submit', async (event)=>{
        const newData = updateCard(event) 
        closeModal('updateFilm')
        const apiPut = async () => {
        const find = oldData.title.textContent
        await fetch(`http://localhost:3000/update/${find}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newData)
        })
        }
        await apiPut()
        library()
    })
    
}
function updateCard(event){

    event.preventDefault()
    const form = event.target.closest('form')
    const imgValue = form.querySelector('#imagemUpdate').value
    const titleValue = form.querySelector('#titleUpdate').value
    const yearValue = form.querySelector('#yearUpdate').value
    const descriptionValue = form.querySelector('#descriptionUpdate').value
    closeModal('updateFilm', null)

    const data = {
        imgUrl: imgValue,
        title: titleValue,
        year: Number(yearValue),
        description: descriptionValue
    }
    
    return data
    
}
async function deleteCard(id){
    const card = document.getElementById(id)
    const find = card.querySelector('.info p:first-of-type span').textContent
    const apiDelete = async () => {
        await fetch(`http://localhost:3000/delete/${find}`, {
            method: 'DELETE',
            headers:{
                'Content-Type': 'application/json'
            },
        })
        
        }
    await apiDelete()
    library()
    closeModal('deleteFilm', null)
}

function getCard(id){
    const deletBtn = document.getElementById('deleteBtn')
    openModal('deleteFilm')
    deletBtn.addEventListener('click', () => deleteCard(id))
}

