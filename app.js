// fetch("delay_data.json")
// .then(response => response.json())
// .then(data => {

//     const total = data.length;

//     const onTime = data.filter(
//         x => x.Status.toLowerCase() === "on time"
//     ).length;

//     const delayed = data.filter(
//         x => x.Status.toLowerCase() === "delayed"
//     ).length;

//     const compliance =
//         ((onTime / total) * 100).toFixed(2);

//     document.getElementById("total").innerText =
//         total;

//     document.getElementById("ontime").innerText =
//         onTime;

//     document.getElementById("delayed").innerText =
//         delayed;

//     document.getElementById("compliance").innerText =
//         compliance + "%";    

//     const delayedRows =
//     data.filter(
//         row => row.Status.toLowerCase() === "delayed"
//     );

//     document.getElementById("delayTable").innerHTML =
//     delayedRows.map(row => `
//         <tr>
//             <td>${row.Month}</td>
//             <td>${row.Region}</td>
//             <td>${row.Site}</td>
//             <td>${row.Analyst}</td>
//             <td class="status-delayed">
//                 ${row.Status}
//             </td>
//         </tr>
//     `).join("");    

//     document.getElementById("exceptionText").innerText =
//     `${delayedRows.length} delayed reports requiring attention`;



// });


// fetch("delay_data.json")
//     .then(response => {
//         if (!response.ok) {
//             throw new Error(
//                 `Could not load delay_data.json. Status: ${response.status}`
//             );
//         }

//         return response.json();
//     })
//     .then(data => {

//         // Standardize status values once
//         const normalizedData = data.map(row => ({
//             ...row,
//             Status: String(row.Status || "").trim().toLowerCase()
//         }));

//         const monthFilter =
//          document.getElementById("monthFilter");
//         const uniqueMonths =
//         [...new Set(
//             normalizedData.map(
//                 row => row.Month
//                 )
//             )];

//         console.log("Months:", uniqueMonths);

//         uniqueMonths.forEach(month => {
//             console.log("Adding:", month);
//             const option =
//             document.createElement("option");
//             option.value = month;
//             option.textContent = month;
//             monthFilter.appendChild(option);
//         });

//         console.log(monthFilter.innerHTML);

//         monthFilter.addEventListener("change", function () {
//             const selectedMonth =
//             this.value;
//             console.log(
//                 "Selected Month:",
//                 selectedMonth
//             );
//         });



//         // -----------------------------
//         // 1. KPI calculations
//         // -----------------------------

//         const total = normalizedData.length;

//         const onTime = normalizedData.filter(
//             row => row.Status === "on time"
//         ).length;

//         const delayed = normalizedData.filter(
//             row => row.Status === "delayed"
//         ).length;

//         const compliance =
//             total === 0
//                 ? 0
//                 : ((onTime / total) * 100).toFixed(2);


//         // -----------------------------
//         // 2. Display KPI values
//         // -----------------------------

//         document.getElementById("total").innerText =
//             total;

//         document.getElementById("ontime").innerText =
//             onTime;

//         document.getElementById("delayed").innerText =
//             delayed;

//         document.getElementById("compliance").innerText =
//             compliance + "%";


//         // -----------------------------
//         // 3. Delayed reports table
//         // -----------------------------

//         const delayedRows = normalizedData.filter(
//             row => row.Status === "delayed"
//         );

//         document.getElementById("delayTable").innerHTML =
//             delayedRows.map(row => `
//                 <tr>
//                     <td>${row.Month}</td>
//                     <td>${row.Region}</td>
//                     <td>${row.Site}</td>
//                     <td>${row.Analyst}</td>
//                     <td class="status-delayed">
//                         Delayed
//                     </td>
//                 </tr>
//             `).join("");


//         // -----------------------------
//         // 4. Delayed report subtitle
//         // -----------------------------

//         document.getElementById("exceptionText").innerText =
//             `${delayedRows.length} delayed reports requiring attention`;


//         // -----------------------------
//         // 5. Build monthly summary
//         // -----------------------------

//         const monthSummary = {};

//         normalizedData.forEach(row => {

//             const month = row.Month;

//             if (!monthSummary[month]) {
//                 monthSummary[month] = {
//                     total: 0,
//                     onTime: 0
//                 };
//             }

//             monthSummary[month].total++;

//             if (row.Status === "on time") {
//                 monthSummary[month].onTime++;
//             }
//         });


//         // -----------------------------
//         // 6. Sort months correctly
//         // -----------------------------

//         const monthOrder = [
//             "January",
//             "February",
//             "March",
//             "April",
//             "May",
//             "June",
//             "July",
//             "August",
//             "September",
//             "October",
//             "November",
//             "December"
//         ];

//         const months = Object.keys(monthSummary).sort(
//             (firstMonth, secondMonth) =>
//                 monthOrder.indexOf(firstMonth) -
//                 monthOrder.indexOf(secondMonth)
//         );


//         // -----------------------------
//         // 7. Calculate monthly compliance
//         // -----------------------------

//         const monthlyCompliance = months.map(month => {

//             const summary = monthSummary[month];

//             if (!summary || summary.total === 0) {
//                 return 0;
//             }

//             return Number(
//                 (
//                     summary.onTime /
//                     summary.total *
//                     100
//                 ).toFixed(2)
//             );
//         });

//         console.log("Month summary:", monthSummary);
//         console.log("Months:", months);
//         console.log(
//             "Monthly compliance:",
//             monthlyCompliance
//         );


//         // -----------------------------
//         // 8. Validate Chart.js and canvas
//         // -----------------------------

//         const monthlyCanvas =
//             document.getElementById("monthlyChart");

//         if (!monthlyCanvas) {
//             throw new Error(
//                 'The canvas id="monthlyChart" was not found in the HTML.'
//             );
//         }

//         if (typeof Chart === "undefined") {
//             throw new Error(
//                 "Chart.js is not loaded. Check the Chart.js script element in new.html."
//             );
//         }


//         // -----------------------------
//         // 9. Create monthly trend chart
//         // -----------------------------

//         new Chart(monthlyCanvas, {
//             type: "line",

//             data: {
//                 labels: months,

//                 datasets: [{
//                     label: "On-Time Compliance (%)",
//                     data: monthlyCompliance,

//                     borderColor: "#1677ff",
//                     backgroundColor:
//                         "rgba(22, 119, 255, 0.12)",

//                     borderWidth: 3,
//                     fill: true,
//                     tension: 0.3,

//                     pointRadius: 5,
//                     pointHoverRadius: 7,
//                     pointBackgroundColor: "#1677ff",
//                     pointBorderColor: "#ffffff",
//                     pointBorderWidth: 2
//                 }]
//             },

//             options: {
//                 responsive: true,
//                 maintainAspectRatio: false,

//                 interaction: {
//                     intersect: false,
//                     mode: "index"
//                 },

//                 plugins: {
//                     legend: {
//                         display: false
//                     },

//                     tooltip: {
//                         callbacks: {
//                             label: context =>
//                                 `${context.parsed.y}% on time`
//                         }
//                     }
//                 },

//                 scales: {
//                     y: {
//                         beginAtZero: true,
//                         max: 100,

//                         ticks: {
//                             callback: value =>
//                                 `${value}%`
//                         },

//                         title: {
//                             display: true,
//                             text: "On-Time Compliance"
//                         }
//                     },

//                     x: {
//                         grid: {
//                             display: false
//                         },

//                         title: {
//                             display: true,
//                             text: "Reporting Month"
//                         }
//                     }
//                 }
//             }
//         });

//         const regionSummary = {};
//         normalizedData.forEach(row => {
//             if (!regionSummary[row.Region]) {
//                 regionSummary[row.Region] = {
//                     total: 0,
//                     onTime: 0
//                 };
//             }

//             regionSummary[row.Region].total++;
//             if (row.Status === "on time") {
//                 regionSummary[row.Region].onTime++;
//             }

//         });

//         console.log(regionSummary);


//         const regions =
//            Object.keys(regionSummary);
//         const regionCompliance =
//            regions.map(region =>{
//             const summary =
//             regionSummary[region];
//             return Number(
//                 (
//                     summary.onTime /
//                     summary.total *
//                     100
//                 ).toFixed(2)

//             )
//         });

//         console.log(regions);
//         console.log(regionCompliance);

//         new Chart(
//             document.getElementById("regionChart"),
//             {
//                 type: "bar",
//                 data: {
//                     labels: regions,
//                     datasets: [{
//                         data: regionCompliance,
//                         backgroundColor: [
//                             "#1677ff",
//                             "#16855b",
//                             "#e49b2f"
//                         ]
//                     }]
//                 }
//             });


//             // options: {

//             //     responsive: true,
//             //     maintainAspectRatio: false,
//             //     plugins: {
//             //         title: {
//             //             display: true,
//             //             text: "Regional Compliance Comparison"
//             //             },
//             //             legend: {
//             //                 display: false
//             //                 }
//             //     }
//             //     scales: {
//             //         y: {
//             //             beginAtZero: true,
//             //             max: 100,
//             //             ticks: {
//             //                 callback: value => value + "%"
//             //             }
//             //         }
//             //     }
//             // });




//     })
//     .catch(error => {
//         console.error("Dashboard error:", error);
//     });

let regionChart;
fetch("delay_data.json")
    .then(response => {
        if (!response.ok) {
            throw new Error(
                `Could not load delay_data.json. Status: ${response.status}`
            );
        }

        return response.json();
    })
    .then(data => {

        // Standardize status values once
        const normalizedData = data.map(row => ({
            ...row,
            Status: String(row.Status || "").trim().toLowerCase()
        }));

        const monthFilter =
            document.getElementById("monthFilter");
        const uniqueMonths =
            [...new Set(
                normalizedData.map(
                    row => row.Month
                )
            )];

        console.log("Months:", uniqueMonths);

        uniqueMonths.forEach(month => {
            console.log("Adding:", month);
            const option =
                document.createElement("option");
            option.value = month;
            option.textContent = month;
            monthFilter.appendChild(option);
        });

        updateRegionChart(normalizedData);

        console.log(monthFilter.innerHTML);

        monthFilter.addEventListener("change", function () {
            const selectedMonth =
                this.value;
            console.log(
                "Selected Month:",
                selectedMonth
            );

            const filteredData =
                selectedMonth === "All"
                    ? normalizedData
                    : normalizedData.filter(
                        row =>
                            row.Month === selectedMonth
                    );

            updateRegionChart(filteredData);

            console.log(filteredData);

            const total =
                filteredData.length;

            const onTime =
                filteredData.filter(
                    row => row.Status === "on time"
                ).length;


            const delayed =
                filteredData.filter(
                    row => row.Status === "delayed"
                ).length;



            const compliance =
                total === 0
                    ? 0
                    : (
                        onTime /
                        total *
                        100
                    ).toFixed(2);

            document.getElementById("total").innerText =
                total;

            document.getElementById("ontime").innerText =
                onTime;

            document.getElementById("delayed").innerText =
                delayed;

            document.getElementById("compliance").innerText =
                compliance + "%";


            const delayedRows =
                filteredData.filter(
                    row => row.Status === "delayed"
                );

            document.getElementById("delayTable").innerHTML =
                delayedRows.map(row => `
                 <tr>
                    <td>${row.Month}</td>
                    <td>${row.Region}</td>
                    <td>${row.Site}</td>
                    <td>${row.Analyst}</td>
                    <td class="status-delayed">
                    Delayed
                   </td>
                 </tr>
                 
                 `).join("");

            document.getElementById("exceptionText").innerText =
                `${delayedRows.length} delayed reports requiring attention`;


        });









        // -----------------------------
        // 1. KPI calculations
        // -----------------------------

        const total = normalizedData.length;

        const onTime = normalizedData.filter(
            row => row.Status === "on time"
        ).length;

        const delayed = normalizedData.filter(
            row => row.Status === "delayed"
        ).length;

        const compliance =
            total === 0
                ? 0
                : ((onTime / total) * 100).toFixed(2);


        // -----------------------------
        // 2. Display KPI values
        // -----------------------------

        document.getElementById("total").innerText =
            total;

        document.getElementById("ontime").innerText =
            onTime;

        document.getElementById("delayed").innerText =
            delayed;

        document.getElementById("compliance").innerText =
            compliance + "%";


        // -----------------------------
        // 3. Delayed reports table
        // -----------------------------

        const delayedRows = normalizedData.filter(
            row => row.Status === "delayed"
        );

        document.getElementById("delayTable").innerHTML =
            delayedRows.map(row => `
                <tr>
                    <td>${row.Month}</td>
                    <td>${row.Region}</td>
                    <td>${row.Site}</td>
                    <td>${row.Analyst}</td>
                    <td class="status-delayed">
                        Delayed
                    </td>
                </tr>
            `).join("");


        // -----------------------------
        // 4. Delayed report subtitle
        // -----------------------------

        document.getElementById("exceptionText").innerText =
            `${delayedRows.length} delayed reports requiring attention`;


        // -----------------------------
        // 5. Build monthly summary
        // -----------------------------

        const monthSummary = {};

        normalizedData.forEach(row => {

            const month = row.Month;

            if (!monthSummary[month]) {
                monthSummary[month] = {
                    total: 0,
                    onTime: 0
                };
            }

            monthSummary[month].total++;

            if (row.Status === "on time") {
                monthSummary[month].onTime++;
            }
        });


        // -----------------------------
        // 6. Sort months correctly
        // -----------------------------

        const monthOrder = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const months = Object.keys(monthSummary).sort(
            (firstMonth, secondMonth) =>
                monthOrder.indexOf(firstMonth) -
                monthOrder.indexOf(secondMonth)
        );


        // -----------------------------
        // 7. Calculate monthly compliance
        // -----------------------------

        const monthlyCompliance = months.map(month => {

            const summary = monthSummary[month];

            if (!summary || summary.total === 0) {
                return 0;
            }

            return Number(
                (
                    summary.onTime /
                    summary.total *
                    100
                ).toFixed(2)
            );
        });

        console.log("Month summary:", monthSummary);
        console.log("Months:", months);
        console.log(
            "Monthly compliance:",
            monthlyCompliance
        );


        // -----------------------------
        // 8. Validate Chart.js and canvas
        // -----------------------------

        const monthlyCanvas =
            document.getElementById("monthlyChart");

        if (!monthlyCanvas) {
            throw new Error(
                'The canvas id="monthlyChart" was not found in the HTML.'
            );
        }

        if (typeof Chart === "undefined") {
            throw new Error(
                "Chart.js is not loaded. Check the Chart.js script element in new.html."
            );
        }


        // -----------------------------
        // 9. Create monthly trend chart
        // -----------------------------

        new Chart(monthlyCanvas, {
            type: "line",

            data: {
                labels: months,

                datasets: [{
                    label: "On-Time Compliance (%)",
                    data: monthlyCompliance,

                    borderColor: "#1677ff",
                    backgroundColor:
                        "rgba(22, 119, 255, 0.12)",

                    borderWidth: 3,
                    fill: true,
                    tension: 0.3,

                    pointRadius: 5,
                    pointHoverRadius: 7,
                    pointBackgroundColor: "#1677ff",
                    pointBorderColor: "#ffffff",
                    pointBorderWidth: 2
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: false,

                interaction: {
                    intersect: false,
                    mode: "index"
                },

                plugins: {
                    legend: {
                        display: false
                    },

                    tooltip: {
                        callbacks: {
                            label: context =>
                                `${context.parsed.y}% on time`
                        }
                    }
                },

                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100,

                        ticks: {
                            callback: value =>
                                `${value}%`
                        },

                        title: {
                            display: true,
                            text: "On-Time Compliance"
                        }
                    },

                    x: {
                        grid: {
                            display: false
                        },

                        title: {
                            display: true,
                            text: "Reporting Month"
                        }
                    }
                }
            }
        });

       


        // options: {

        //     responsive: true,
        //     maintainAspectRatio: false,
        //     plugins: {
        //         title: {
        //             display: true,
        //             text: "Regional Compliance Comparison"
        //             },
        //             legend: {
        //                 display: false
        //                 }
        //     }
        //     scales: {
        //         y: {
        //             beginAtZero: true,
        //             max: 100,
        //             ticks: {
        //                 callback: value => value + "%"
        //             }
        //         }
        //     }
        // });




    })
    .catch(error => {
        console.error("Dashboard error:", error);
    });

function updateRegionChart(data) {

    const regionSummary = {};

    data.forEach(row => {

        const region = row.Region;

        if (!region) {
            return;
        }

        if (!regionSummary[region]) {
            regionSummary[region] = {
                total: 0,
                onTime: 0
            };
        }

        regionSummary[region].total++;

        if (row.Status === "on time") {
            regionSummary[region].onTime++;
        }
    });

    const preferredRegionOrder = [
        "Americas",
        "APAC",
        "EMEA"
    ];

    const regions = Object.keys(regionSummary).sort(
        (firstRegion, secondRegion) => {

            const firstIndex =
                preferredRegionOrder.indexOf(firstRegion);

            const secondIndex =
                preferredRegionOrder.indexOf(secondRegion);

            if (firstIndex === -1 && secondIndex === -1) {
                return firstRegion.localeCompare(secondRegion);
            }

            if (firstIndex === -1) {
                return 1;
            }

            if (secondIndex === -1) {
                return -1;
            }

            return firstIndex - secondIndex;
        }
    );

    const regionalCompliance = regions.map(region => {

        const summary = regionSummary[region];

        if (summary.total === 0) {
            return 0;
        }

        return Number(
            (
                summary.onTime /
                summary.total *
                100
            ).toFixed(2)
        );
    });

    const regionalColors =
        regionalCompliance.map(value => {

            if (value >= 90) {
                return "#16855b";
            }

            if (value >= 70) {
                return "#e49b2f";
            }

            return "#c53c4c";
        });

    const regionCanvas =
        document.getElementById("regionChart");

    if (!regionCanvas) {
        console.error(
            'Canvas id="regionChart" was not found.'
        );

        return;
    }

    if (regionChart) {
        regionChart.destroy();
    }

    regionChart = new Chart(regionCanvas, {
        type: "bar",

        data: {
            labels: regions,

            datasets: [{
                label: "On-Time Compliance (%)",
                data: regionalCompliance,
                backgroundColor: regionalColors,
                borderRadius: 8,
                borderSkipped: false
            }]
        },

        options: {
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
                legend: {
                    display: false
                },

                tooltip: {
                    callbacks: {
                        label: context =>
                            `${context.parsed.y}% on time`
                    }
                }
            },

            scales: {
                y: {
                    beginAtZero: true,
                    max: 100,

                    ticks: {
                        callback: value =>
                            `${value}%`
                    },

                    title: {
                        display: true,
                        text: "On-Time Compliance"
                    }
                },

                x: {
                    grid: {
                        display: false
                    },

                    title: {
                        display: true,
                        text: "Region"
                    }
                }
            }
        }
    });
}
