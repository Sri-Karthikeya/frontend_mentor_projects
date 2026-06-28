
let filters = []
let allJobs = []

fetch('./data.json')
    .then(res => res.json())
    .then(data => {
        allJobs = data;
        renderJobs(allJobs);

    })


function renderJobs(jobs) {
    const content = document.querySelector(".content");
    content.innerHTML = '';

    jobs.forEach(job => {
        const allTags = [job.role, job.level, ...job.languages, ...job.tools]
        const card = document.createElement('div')
        card.classList.add('card')
        card.innerHTML = `
        <div class="image-div">
                    <img src="${job.logo}" alt="${job.company}" class="image">
                    </div>
                    <div class="matter">
                        <div class="top-matter">
                            <span class="company-name"> ${job.company}</span>
                            ${job.new ? '<span class="new"> New</span>' : ''}
                            ${job.featured ? '<span class="feature"> Featured</span>' : ''}
                        </div>
                        <div class="middle-matter">
                            <h3 class="position-name">${job.position}</h3>
                        </div>

                        <div class="botton-matter">
                            <span class="details">${job.postedAt}</span>
                            <span class="details">${job.contract}</span>
                            <span class="details">${job.location}</span>
                        </div>
                    </div>
                    <div class="tags">
                    ${allTags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                `


        card.querySelectorAll('.tag').forEach(TagE1 => {
            TagE1.addEventListener('click', () => {
                const value = TagE1.textContent.trim();
                if (!filters.includes(value)) {
                    filters.push(value);
                    renderFliters();
                    applyFilters();
                }
            })
        })

        content.appendChild(card)
    })
}


function renderFliters(){
    document.querySelectorAll('.active-filters').forEach(el => el.remove());
    const Filtered = document.querySelector(".filtered-tags");
    const deleteBtn = document.querySelector(".clear");
    filters.forEach(f =>{
        const div = document.createElement("div");
        div.classList.add("active-filters");
        div.innerHTML=`
        <span class="filtered-tag">${f} </span>
                    <span class="remove-btn">
                        <img src="./images/icon-remove.svg" alt="remove" class="remove">
                    </span>
                    `

        div.querySelector(".remove-btn").addEventListener("click",()=>{
            filters = filters.filter(item => item != f);
            renderFliters();
            applyFilters();
        })
        Filtered.insertBefore(div, deleteBtn);
    })
    document.querySelector('.Nav').style.display = filters.length >0 ?'flex':'none';
}

function applyFilters(){
    document.querySelectorAll(".card").forEach(card=>{
        const cardTags = [...card.querySelectorAll(".tag")].map(f => f.textContent.trim());
        const match = filters.every(f=>cardTags.includes(f));
        card.style.display=match? 'flex':'none';
        })
}

document.querySelector('.clear').addEventListener("click",()=>{
    filters=[];
    renderFliters();
    applyFilters();
})

