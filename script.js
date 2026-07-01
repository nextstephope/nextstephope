// 1. DATA CENTER (Lesson 3): Jobs ki Mukammal List
const jobsData = [
    {
        title: "Data Entry Operator",
        category: "govt",
        categoryText: "Government",
        location: "Islamabad, Pakistan",
        extra: "Last Date: 15 July 2026",
        desc: "Federal Govt Department ko emergency basis par Data Entry Operators ki zaroorat hai. Typing speed kam se kam 40 WPM honi chahiye. Metric/FA pass candidates apply kar sakte hain."
    },
    {
        title: "Junior Web Developer",
        category: "private",
        categoryText: "Private",
        location: "Lahore (Remote / Work from Home)",
        extra: "Last Date: 20 July 2026",
        desc: "Software House ko Junior Frontend Developer chahiye jise HTML, CSS aur basic JavaScript aati ho. Git aur GitHub ka ilm hona lazmi hai. Freshers ko welcome kiya jayega."
    },
    {
        title: "Electrician & Industrial Technician",
        category: "abroad",
        categoryText: "✈️ Abroad Work Visa",
        location: "Dubai (UAE)",
        extra: "Free Accommodation & Medical Provided",
        desc: "Urgent Gulf Work Visa demand. Company ki taraf se Rehaish (Room), Medical, aur Transport bilkul free hai. Overtime lagane ka sunehra mauka. Duty 8 ghante."
    },
    {
        title: "Warehouse Packer & Loader",
        category: "abroad",
        categoryText: "✈️ Abroad Work Visa",
        location: "Riyadh (Saudi Arabia)",
        extra: "Food Allowance + Medical Free",
        desc: "Famous Logistics company ke warehouse mein Packing aur Loading ke liye ladke chahiye. Umr ki hadd 18 se 35 saal. Iqama aur Medical company ke zimmey hoga."
    },
    {
        title: "Airport Security Guard",
        category: "abroad",
        categoryText: "✈️ Abroad Work Visa",
        location: "Doha (Qatar)",
        extra: "Duty: 8 Hours + Daily Overtime",
        desc: "Qatar International Airport ke liye Security Guards ki urgent recruitment. Qadd (Height) kam se kam 5ft 8inch honi chahiye. Basic English bolna aati ho."
    }
];

// 2. FUNCTION: Web page par dynamic cards render karna
function displayJobs(jobsArray) {
    const jobListContainer = document.getElementById('jobList');
    if (!jobListContainer) return; // Agar index page nahi hai to ruk jao
    
    jobListContainer.innerHTML = ""; 

    jobsArray.forEach((job, index) => {
        const card = document.createElement('div');
        card.className = `job-card ${job.category}`;

        card.innerHTML = `
            <span class="job-type type-${job.category}">${job.categoryText}</span>
            <h3 class="job-title">${job.title}</h3>
            <p class="job-desc">📍 ${job.location} | 📅 ${job.extra}</p>
            <button class="btn-view" onclick="viewJob(${index})">View Details</button>
        `;
        jobListContainer.appendChild(card);
    });
}

// Website load hote hi sabse pehle saari jobs dikhao
displayJobs(jobsData);

// 3. FUNCTION: Filter Buttons Working (Lesson 3)
function filterJobs(category) {
    let heading = document.getElementById('sectionHeading');
    if (!heading) return;

    if (category === 'all') {
        heading.innerText = "Showing All Jobs";
        displayJobs(jobsData);
    } else {
        if(category === 'govt') heading.innerText = "Showing Government Jobs";
        if(category === 'private') heading.innerText = "Showing Private Jobs";
        if(category === 'abroad') heading.innerText = "Showing Abroad Work Visa Jobs ✈️";

        const filtered = jobsData.filter(job => job.category === category);
        displayJobs(filtered);
    }
}

// 4. FUNCTION: Search Box (Lesson 3)
function searchJob() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    
    const searchedJobs = jobsData.filter(job => {
        return job.title.toLowerCase().includes(input) || job.location.toLowerCase().includes(input);
    });

    displayJobs(searchedJobs);
}

// 5. FUNCTION: Detail Page par redirect karne ka logic (Lesson 2 & 5 Connection)
function viewJob(index) {
    const selectedJob = jobsData[index];
    // Data ko URL Parameters ke zariye detail page par bhejna
    window.location.href = `job-detail.html?title=${encodeURIComponent(selectedJob.title)}&type=${encodeURIComponent(selectedJob.categoryText)}&loc=${encodeURIComponent(selectedJob.location)}&info=${encodeURIComponent(selectedJob.extra)}&desc=${encodeURIComponent(selectedJob.desc)}`;
}

// 6. DETAILED PAGE HANDLING CODE: Yeh code automatic chalega jab job-detail.html khulegi
window.onload = function() {
    const params = new URLSearchParams(window.location.search);
    if (params.has('title')) {
        document.getElementById('detTitle').innerText = params.get('title');
        document.getElementById('detType').innerText = params.get('type');
        document.getElementById('detLoc').innerText = "Location: " + params.get('loc');
        document.getElementById('detInfo').innerText = params.get('info');
        document.getElementById('detDesc').innerText = params.get('desc');
    }
}