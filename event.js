const holidays = [
    {
      hdate: "01-01-2025",
      holiday: "New Year Day",
    },
    {
      hdate: "15-01-2025",
      holiday: "Pongal",
    },
    {
      hdate: "16-01-2025",
      holiday: "Thiruvalluvar Day",
    },
    {
      hdate: "17-01-2025",
      holiday: "Uzhavar Thirunal",
    },
    {
      hdate: "26-01-2025",
      holiday: "Republic Day",
    },
    {
      hdate: "05-02-2025",
      holiday: "Thai Poosam",
    },
    {
      hdate: "22-03-2025",
      holiday: "Telugu New Year Day",
    },
    {
      hdate: "01-04-2025",
      holiday: "Annual closing of Accounts for Commercial Banks and Co-operative Banks",
    },
    {
      hdate: "04-04-2025",
      holiday: "Mahaveer Jayanthi",
    },
    {
      hdate: "07-04-2025",
      holiday: "Good Friday",
    },
    {
      hdate: "14-04-2025",
      holiday: "Tamil New Years Day and Dr.B.R.Ambedkars Birthday",
    },
    {
      hdate: "22-04-2025",
      holiday: "Ramzan (Idul Fitr)",
    },
    {
      hdate: "01-05-2025",
      holiday: "May Day",
    },
    {
      hdate: "29-06-2025",
      holiday: "Bakrid(Idul Azha)",
    },
    {
      hdate: "29-07-2025",
      holiday: "Muharram",
    },
    {
      hdate: "15-08-2025",
      holiday: "Independence Day",
    },
    {
      hdate: "06-09-2025",
      holiday: "Krishna Jayanthi",
    },
    {
      hdate: "17-09-2025",
      holiday: "Vinayakar Chathurthi",
    },
    {
      hdate: "28-09-2025",
      holiday: "Milad-un-Nabi",
    },
    {
      hdate: "02-10-2025",
      holiday: "Gandhi Jayanthi",
    },
    {
      hdate: "23-10-2025",
      holiday: "Ayutha Pooja",
    },
    {
      hdate: "24-10-2025",
      holiday: "Vijaya Dasami",
    },
    {
      hdate: "12-11-2025",
      holiday: "Deepavali",
    },
    {
      hdate: "25-12-2025",
      holiday: "Christmas",
    },
];

const calendar = document.querySelector("#calendar");
const monthBanner = document.querySelector("#month");
const eventsList = document.querySelector(".event-desc ul");
let navigation = 0;
let clicked = null;
let events = localStorage.getItem("events") ? JSON.parse(localStorage.getItem("events")) : [];
const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function loadCalendar() {
    const dt = new Date();

    if (navigation != 0) {
        dt.setMonth(new Date().getMonth() + navigation);
    }

    const day = dt.getDate();
    const month = dt.getMonth();
    const year = dt.getFullYear();
    monthBanner.innerText = `${dt.toLocaleDateString("en-us", { month: "long" })} ${year}`;
    calendar.innerHTML = "";

    const dayInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayofMonth = new Date(year, month, 1);
    const emptyDays = weekdays.indexOf(firstDayofMonth.toLocaleDateString("en-us", { weekday: "long" }));

    for (let i = 1; i <= dayInMonth + emptyDays; i++) {
        const dayBox = document.createElement("div");
        dayBox.classList.add("day");

        const monthVal = month + 1 < 10 ? "0" + (month + 1) : month + 1;
        const dateVal = i - emptyDays < 10 ? "0" + (i - emptyDays) : i - emptyDays;
        const dateText = `${dateVal}-${monthVal}-${year}`;

        if (i > emptyDays) {
            dayBox.innerText = i - emptyDays;

            const eventOfTheDay = events.find((e) => e.date == dateText);
            const holidayOfTheDay = holidays.find((e) => e.hdate == dateText);

            if (i - emptyDays === day && navigation == 0) {
                dayBox.id = "currentDay";
            }

            if (eventOfTheDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.innerText = eventOfTheDay.title;
                dayBox.appendChild(eventDiv);
            }

            if (holidayOfTheDay) {
                const eventDiv = document.createElement("div");
                eventDiv.classList.add("event");
                eventDiv.classList.add("holiday");
                eventDiv.innerText = holidayOfTheDay.holiday;
                dayBox.appendChild(eventDiv);
            }

            dayBox.addEventListener("click", () => {
                showModal(dateText);
            });
        } else {
            dayBox.classList.add("plain");
        }
        calendar.append(dayBox);
    }
}

function updateEventsList() {
    eventsList.innerHTML = ""; // Clear the existing list
    if (events.length > 0) {
        events.forEach((event) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<span>${event.date}</span> ${event.title}`;
            eventsList.appendChild(listItem);
        });
    } else {
        const noEventsItem = document.createElement("li");
        noEventsItem.innerHTML = `<span>Date</span> No events`;
        eventsList.appendChild(noEventsItem);
    }
}

function buttons() {
    const btnBack = document.querySelector("#btnBack");
    const btnNext = document.querySelector("#btnNext");
    const btnDelete = document.querySelector("#btnDelete");
    const btnSave = document.querySelector("#btnSave");
    const closeButtons = document.querySelectorAll(".btnClose");
    const txtTitle = document.querySelector("#txtTitle");

    btnBack.addEventListener("click", () => {
        navigation--;
        loadCalendar();
    });

    btnNext.addEventListener("click", () => {
        navigation++;
        loadCalendar();
    });

    modal.addEventListener("click", closeModal);

    closeButtons.forEach((btn) => {
        btn.addEventListener("click", closeModal);
    });

    btnDelete.addEventListener("click", function () {
        events = events.filter((e) => e.date !== clicked);
        localStorage.setItem("events", JSON.stringify(events));
        updateEventsList();
        closeModal();
    });

    btnSave.addEventListener("click", function () {
        if (txtTitle.value) {
            txtTitle.classList.remove("error");
            events.push({
                date: clicked,
                title: txtTitle.value.trim(),
            });
            txtTitle.value = "";
            localStorage.setItem("events", JSON.stringify(events));
            updateEventsList();
            closeModal();
        } else {
            txtTitle.classList.add("error");
        }
    });
}

const modal = document.querySelector("#modal");
const viewEventForm = document.querySelector("#viewEvent");
const addEventForm = document.querySelector("#addEvent");

function showModal(dateText) {
    clicked = dateText;
    const eventOfTheDay = events.find((e) => e.date == dateText);
    if (eventOfTheDay) {
        document.querySelector("#eventText").innerText = eventOfTheDay.title;
        viewEventForm.style.display = "block";
    } else {
        addEventForm.style.display = "block";
    }
    modal.style.display = "block";
}

function closeModal() {
    viewEventForm.style.display = "none";
    addEventForm.style.display = "none";
    modal.style.display = "none";
    clicked = null;
    loadCalendar();
}

buttons();
loadCalendar();
updateEventsList();
