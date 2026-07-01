// Initial Sample Data (matching user's Excel sheet exactly)
const INITIAL_DATA = [
  { "id": "T-1", "customer": "AH-GN", "asalBarang": "A JUMBO @100", "status": "TIDAK_PO", "berat": 1800 },
  { "id": "T-2", "customer": "AH-GN", "asalBarang": "A NTR L", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-3", "customer": "AH-GN", "asalBarang": "A NTR L SEMU", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-4", "customer": "AH-GN", "asalBarang": "A NTR SEMU", "status": "TIDAK_PO", "berat": 1500 },
  { "id": "T-5", "customer": "AH-GN", "asalBarang": "B NTR L", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-6", "customer": "AH-GN", "asalBarang": "B NTR T SEMU", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-7", "customer": "AH-GN", "asalBarang": "C JELEK", "status": "TIDAK_PO", "berat": 1500 },
  { "id": "T-8", "customer": "AH-GN", "asalBarang": "C NTR T", "status": "TIDAK_PO", "berat": 600 },
  { "id": "T-9", "customer": "AH-GN", "asalBarang": "MK KCL", "status": "TIDAK_PO", "berat": 600 },
  { "id": "T-10", "customer": "AH-GN", "asalBarang": "MK KCL NTR", "status": "TIDAK_PO", "berat": 600 },
  { "id": "T-11", "customer": "AH-GN", "asalBarang": "OV JUMBO @100", "status": "TIDAK_PO", "berat": 2300 },
  { "id": "T-12", "customer": "AH-GN", "asalBarang": "OV JUMBO @50", "status": "TIDAK_PO", "berat": 100 },
  { "id": "T-13", "customer": "AH-GN", "asalBarang": "OV KCL", "status": "TIDAK_PO", "berat": 600 },
  { "id": "T-14", "customer": "AH-GN", "asalBarang": "OV KCL NTR", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-15", "customer": "AH-GN", "asalBarang": "OV NTR T", "status": "TIDAK_PO", "berat": 600 },
  { "id": "T-16", "customer": "AH-GN", "asalBarang": "SDT NTR L", "status": "TIDAK_PO", "berat": 2700 },
  { "id": "T-17", "customer": "AH-GN", "asalBarang": "S+ KUNING", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-18", "customer": "AH-GN", "asalBarang": "S+ SEMU", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-19", "customer": "AH-GN", "asalBarang": "SDT JUMBO @100", "status": "TIDAK_PO", "berat": 200 },
  { "id": "T-20", "customer": "AH-GN", "asalBarang": "SDT JUMBO @50", "status": "TIDAK_PO", "berat": 100 },
  { "id": "T-21", "customer": "AH-GN", "asalBarang": "HCR @10", "status": "TIDAK_PO", "berat": 3300 },
  { "id": "T-22", "customer": "AH-GN", "asalBarang": "P1 MK ABU", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-23", "customer": "AH-GN", "asalBarang": "P1 MK NTR SEMU", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-24", "customer": "AH-GN", "asalBarang": "P1 OV NTR", "status": "TIDAK_PO", "berat": 600 },
  { "id": "T-25", "customer": "AH-GN", "asalBarang": "P1 SDT NTR", "status": "TIDAK_PO", "berat": 1200 },
  { "id": "T-26", "customer": "AH-GN", "asalBarang": "P2 NTR", "status": "TIDAK_PO", "berat": 2400 },
  { "id": "T-27", "customer": "AH-GN", "asalBarang": "MK KCL SEMU", "status": "TIDAK_PO", "berat": 600 },
  { "id": "T-28", "customer": "AH-GN", "asalBarang": "B NTR SEMU", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-29", "customer": "XM", "asalBarang": "A", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-30", "customer": "XM", "asalBarang": "N3", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-31", "customer": "XM", "asalBarang": "P1", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-32", "customer": "XM", "asalBarang": "A NTR L", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-33", "customer": "XM", "asalBarang": "B NTR L", "status": "TIDAK_PO", "berat": 600 },
  { "id": "T-34", "customer": "XM", "asalBarang": "C NTR L", "status": "TIDAK_PO", "berat": 600 },
  { "id": "T-35", "customer": "XM", "asalBarang": "OV NTR L", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-36", "customer": "XM", "asalBarang": "OV KCL NTR", "status": "TIDAK_PO", "berat": 300 },
  { "id": "T-37", "customer": "XM", "asalBarang": "SDT NTR L", "status": "TIDAK_PO", "berat": 11100 },
  { "id": "T-38", "customer": "XM", "asalBarang": "P1 OV NTR", "status": "TIDAK_PO", "berat": 300 },
  { "id": "P-1", "customer": "AH-GN", "asalBarang": "P1 GPG SDT", "status": "PO_TERBARU", "berat": 900 },
  { "id": "P-2", "customer": "AH-GN", "asalBarang": "P2", "status": "PO_TERBARU", "berat": 300 },
  { "id": "P-3", "customer": "AH-GN", "asalBarang": "P3 @10", "status": "PO_TERBARU", "berat": 600 },
  { "id": "P-4", "customer": "AH-GN", "asalBarang": "P1 @10", "status": "PO_TERBARU", "berat": 600 },
  { "id": "P-5", "customer": "AH-GN", "asalBarang": "P1 @50", "status": "PO_TERBARU", "berat": 300 },
  { "id": "P-6", "customer": "MR LIAO 2", "asalBarang": "OV SEMU", "status": "PO_TERBARU", "berat": 300 },
  { "id": "S-1", "customer": "MR LIAO 2", "namaBarang": "S1", "status": "STOK_PACKING", "berat": 3000 },
  { "id": "S-2", "customer": "MR LIAO 2", "namaBarang": "S2", "status": "STOK_PACKING", "berat": 1500 },
  { "id": "S-3", "customer": "MR LIAO 2", "namaBarang": "S3", "status": "STOK_PACKING", "berat": 900 },
  { "id": "S-4", "customer": "MR LIAO 2", "namaBarang": "S6", "status": "STOK_PACKING", "berat": 300 },
  { "id": "S-5", "customer": "MR LIAO 2", "namaBarang": "K1", "status": "STOK_PACKING", "berat": 3900 },
  { "id": "S-6", "customer": "MR LIAO 2", "namaBarang": "K2", "status": "STOK_PACKING", "berat": 1500 },
  { "id": "S-7", "customer": "MR LIAO 2", "namaBarang": "S5", "status": "STOK_PACKING", "berat": 3000 },
  { "id": "S-8", "customer": "MR LIAO 2", "namaBarang": "S5 K", "status": "STOK_PACKING", "berat": 1200 },
  { "id": "S-9", "customer": "MR LIAO 2", "namaBarang": "SOA", "status": "STOK_PACKING", "berat": 2400 },
  { "id": "S-10", "customer": "MR LIAO 2", "namaBarang": "P1 K", "status": "STOK_PACKING", "berat": 7500 },
  { "id": "S-11", "customer": "MR LIAO 2", "namaBarang": "POA", "status": "STOK_PACKING", "berat": 1500 },
  { "id": "S-12", "customer": "MR LIAO 2", "namaBarang": "ST", "status": "STOK_PACKING", "berat": 27900 },
  { "id": "S-13", "customer": "MR LIAO 2", "namaBarang": "STK", "status": "STOK_PACKING", "berat": 11700 },
  { "id": "S-14", "customer": "MR LIAO 2", "namaBarang": "PTK", "status": "STOK_PACKING", "berat": 8400 },
  { "id": "S-15", "customer": "MR LIAO 2", "namaBarang": "T1", "status": "STOK_PACKING", "berat": 7500 },
  { "id": "S-16", "customer": "MR LIAO 2", "namaBarang": "T2", "status": "STOK_PACKING", "berat": 3900 },
  { "id": "S-17", "customer": "MR LIAO 2", "namaBarang": "STT", "status": "STOK_PACKING", "berat": 3300 },
  { "id": "O-1", "customer": "AH-GN", "asalBarang": "C JELEK", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 150, "PB": 150 } },
  { "id": "O-2", "customer": "AH-GN", "asalBarang": "A JUMBO @100", "status": "OUTSPEK", "berat": 100, "warnaBreakdown": { "PB": 100 } },
  { "id": "O-3", "customer": "AH-GN", "asalBarang": "A JUMBO @50", "status": "OUTSPEK", "berat": 200, "warnaBreakdown": { "PT": 100, "PB": 100 } },
  { "id": "O-4", "customer": "AH-GN", "asalBarang": "A NTR T", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 100, "PB": 200 } },
  { "id": "O-5", "customer": "AH-GN", "asalBarang": "C NTR T", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 250, "PB": 50 } },
  { "id": "O-6", "customer": "AH-GN", "asalBarang": "OV NTR T", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 150, "PB": 150 } },
  { "id": "O-7", "customer": "AH-GN", "asalBarang": "MK KCL", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 250, "PB": 50 } },
  { "id": "O-8", "customer": "AH-GN", "asalBarang": "OV KCL", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 150, "PB": 150 } },
  { "id": "O-9", "customer": "AH-GN", "asalBarang": "SDT JUMBO @50", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 200, "PB": 100 } },
  { "id": "O-10", "customer": "AH-GN", "asalBarang": "P1 OV NTR", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 100, "PB": 200 } },
  { "id": "O-11", "customer": "AH-GN", "asalBarang": "SDT KCL", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 250, "PB": 50 } },
  { "id": "O-12", "customer": "AH-GN", "asalBarang": "SDT KCL NTR", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 200, "PB": 100 } },
  { "id": "O-13", "customer": "AH-GN", "asalBarang": "SDT NTR L", "status": "OUTSPEK", "berat": 600, "warnaBreakdown": { "PT": 300, "PB": 300 } },
  { "id": "O-14", "customer": "AH-GN", "asalBarang": "P2 NTR", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 100, "PB": 200 } },
  { "id": "O-15", "customer": "AH-GN", "asalBarang": "SDT NTR T", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 50, "PB": 250 } },
  { "id": "O-16", "customer": "AH-GN", "asalBarang": "OV NTR L", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 150, "PB": 150 } },
  { "id": "O-17", "customer": "CHEN 2", "asalBarang": "C2", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 50, "PB": 250 } },
  { "id": "O-18", "customer": "XM", "asalBarang": "A", "status": "OUTSPEK", "berat": 600, "warnaBreakdown": { "PT": 150, "PB": 200, "ABU": 250 } },
  { "id": "O-19", "customer": "XM", "asalBarang": "B", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 200, "PB": 100 } },
  { "id": "O-20", "customer": "XM", "asalBarang": "A JUMBO @100", "status": "OUTSPEK", "berat": 200, "warnaBreakdown": { "PT": 200 } },
  { "id": "O-21", "customer": "XM", "asalBarang": "A JUMBO @50", "status": "OUTSPEK", "berat": 100, "warnaBreakdown": { "PB": 100 } },
  { "id": "O-22", "customer": "XM", "asalBarang": "N3", "status": "OUTSPEK", "berat": 600, "warnaBreakdown": { "PT": 250, "PB": 350 } },
  { "id": "O-23", "customer": "XM", "asalBarang": "N3 SEMU", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PCS": 300 } },
  { "id": "O-24", "customer": "XM", "asalBarang": "OV", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 100, "PB": 150, "SEMU": 50 } },
  { "id": "O-25", "customer": "XM", "asalBarang": "P1", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 200, "PB": 100 } },
  { "id": "O-26", "customer": "XM", "asalBarang": "P1 GPG SDT", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 50, "PB": 250 } },
  { "id": "O-27", "customer": "XM", "asalBarang": "P1 MK NTR", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 150, "PB": 150 } },
  { "id": "O-28", "customer": "XM", "asalBarang": "P2", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 50, "PB": 250 } },
  { "id": "O-29", "customer": "XM", "asalBarang": "SDT NTR L", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 200, "PB": 100 } },
  { "id": "O-30", "customer": "MR LIAO 2", "asalBarang": "A JELEK", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 200, "PB": 100 } },
  { "id": "O-31", "customer": "MR LIAO 2", "asalBarang": "B JELEK", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 50, "PB": 250 } },
  { "id": "O-32", "customer": "MR LIAO 2", "asalBarang": "OV 1", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 150, "PB": 150 } },
  { "id": "O-33", "customer": "MR LIAO 2", "asalBarang": "P1 MK", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 50, "PB": 50, "PK": 50, "ABU": 150 } },
  { "id": "O-34", "customer": "MR LIAO 2", "asalBarang": "P1 MK SEMU", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "ABU": 100, "SEMU": 200 } },
  { "id": "O-35", "customer": "MR LIAO 2", "asalBarang": "P1 OV SEMU", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "BELANG": 300 } },
  { "id": "O-36", "customer": "MR LIAO 2", "asalBarang": "P1 SDT", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 50, "PB": 250 } },
  { "id": "O-37", "customer": "MR LIAO 2", "asalBarang": "SDT 1", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 250, "PB": 50 } },
  { "id": "O-38", "customer": "MR LIAO 2", "asalBarang": "SDT 2", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "PT": 250, "PK": 50 } },
  { "id": "O-39", "customer": "MR LIAO 2", "asalBarang": "SOA", "status": "OUTSPEK", "berat": 600, "warnaBreakdown": { "BELANG": 600 } },
  { "id": "O-40", "customer": "MR LIAO 2", "asalBarang": "ST", "status": "OUTSPEK", "berat": 300, "warnaBreakdown": { "BELANG": 300 } }
];

// Colors available in Outspek
const COLORS = ["PT", "PB", "PK", "ABU", "SEMU", "PCS", "BELANG"];

// Application State
let state = {
  stock: [],
  selectedMergeItems: [],
  searchQueries: {
    TIDAK_PO: "",
    PO_TERBARU: "",
    OUTSPEK: "",
    STOK_PACKING: ""
  }
};

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  loadData();
  setupEventListeners();
  renderAll();
});

// Load data from LocalStorage or fall back to Initial Sample Data
function loadData() {
  const saved = localStorage.getItem("walet_stock_data");
  if (saved) {
    try {
      state.stock = JSON.parse(saved);
      // Migrate "TP" keys to "PT" if they exist in saved data
      if (Array.isArray(state.stock)) {
        state.stock.forEach(item => {
          if (item.warnaBreakdown) {
            if (item.warnaBreakdown.hasOwnProperty("TP")) {
              item.warnaBreakdown.PT = item.warnaBreakdown.TP;
              delete item.warnaBreakdown.TP;
            }
          }
        });
      }
    } catch (e) {
      console.error("Error loading data from localStorage, resetting to default.", e);
      state.stock = [...INITIAL_DATA];
    }
  } else {
    state.stock = [...INITIAL_DATA];
    saveData();
  }
}

// Save state to LocalStorage
function saveData() {
  localStorage.setItem("walet_stock_data", JSON.stringify(state.stock));
}

// Main render router
function renderAll() {
  updateStats();
  renderPivotTables();
  renderBoard();
  renderOutspekMatcher();
}

// Update Top Dashboard stats
function updateStats() {
  const totalTidakPO = state.stock.filter(item => item.status === "TIDAK_PO").reduce((sum, item) => sum + item.berat, 0);
  const totalPOTerbaru = state.stock.filter(item => item.status === "PO_TERBARU").reduce((sum, item) => sum + item.berat, 0);
  const totalOutspek = state.stock.filter(item => item.status === "OUTSPEK").reduce((sum, item) => sum + item.berat, 0);
  const totalPacking = state.stock.filter(item => item.status === "STOK_PACKING").reduce((sum, item) => sum + item.berat, 0);

  document.getElementById("stat-tidak-po").innerText = formatNumber(totalTidakPO);
  document.getElementById("stat-po-terbaru").innerText = formatNumber(totalPOTerbaru);
  document.getElementById("stat-outspek").innerText = formatNumber(totalOutspek);
  document.getElementById("stat-stok-packing").innerText = formatNumber(totalPacking);
}

// Format numbers with thousands separators
function formatNumber(num) {
  return new Intl.NumberFormat("id-ID").format(num);
}

// Helper to group by customer, then by some key
function groupAndSum(items, keyProperty) {
  const grouped = {};
  items.forEach(item => {
    const cust = item.customer;
    const key = item[keyProperty] || "Unknown";
    if (!grouped[cust]) grouped[cust] = {};
    if (!grouped[cust][key]) grouped[cust][key] = 0;
    grouped[cust][key] += item.berat;
  });
  return grouped;
}

// Render the summary pivot tables (Tab 1)
function renderPivotTables() {
  renderTidakPOTable();
  renderPOTerbaruTable();
  renderStokPackingTable();
  renderOutspekTable();
}

function renderTidakPOTable() {
  const container = document.getElementById("tidak-po-table-body");
  container.innerHTML = "";
  
  const items = state.stock.filter(item => item.status === "TIDAK_PO");
  if (items.length === 0) {
    container.innerHTML = `<tr><td colspan="3" class="empty-state">Tidak ada data.</td></tr>`;
    return;
  }

  const grouped = groupAndSum(items, "asalBarang");
  let grandTotal = 0;

  Object.keys(grouped).sort().forEach(cust => {
    let custTotal = 0;
    Object.keys(grouped[cust]).sort().forEach(asal => {
      const weight = grouped[cust][asal];
      custTotal += weight;
      grandTotal += weight;
      
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cust}</td>
        <td>${asal}</td>
        <td>${formatNumber(weight)} g</td>
      `;
      container.appendChild(row);
    });

    // Customer Total row
    const totalRow = document.createElement("tr");
    totalRow.className = "row-total";
    totalRow.innerHTML = `
      <td>${cust} Total</td>
      <td></td>
      <td>${formatNumber(custTotal)} g</td>
    `;
    container.appendChild(totalRow);
  });

  // Grand Total row
  const grandRow = document.createElement("tr");
  grandRow.className = "row-grand-total";
  grandRow.innerHTML = `
    <td>Grand Total</td>
    <td></td>
    <td>${formatNumber(grandTotal)} g</td>
  `;
  container.appendChild(grandRow);
}

function renderPOTerbaruTable() {
  const container = document.getElementById("po-terbaru-table-body");
  container.innerHTML = "";
  
  const items = state.stock.filter(item => item.status === "PO_TERBARU");
  if (items.length === 0) {
    container.innerHTML = `<tr><td colspan="3" class="empty-state">Tidak ada data.</td></tr>`;
    return;
  }

  const grouped = groupAndSum(items, "asalBarang");
  let grandTotal = 0;

  Object.keys(grouped).sort().forEach(cust => {
    let custTotal = 0;
    Object.keys(grouped[cust]).sort().forEach(asal => {
      const weight = grouped[cust][asal];
      custTotal += weight;
      grandTotal += weight;
      
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cust}</td>
        <td>${asal}</td>
        <td>${formatNumber(weight)} g</td>
      `;
      container.appendChild(row);
    });

    const totalRow = document.createElement("tr");
    totalRow.className = "row-total";
    totalRow.innerHTML = `
      <td>${cust} Total</td>
      <td></td>
      <td>${formatNumber(custTotal)} g</td>
    `;
    container.appendChild(totalRow);
  });

  const grandRow = document.createElement("tr");
  grandRow.className = "row-grand-total";
  grandRow.innerHTML = `
    <td>Grand Total</td>
    <td></td>
    <td>${formatNumber(grandTotal)} g</td>
  `;
  container.appendChild(grandRow);
}

function renderStokPackingTable() {
  const container = document.getElementById("stok-packing-table-body");
  container.innerHTML = "";
  
  const items = state.stock.filter(item => item.status === "STOK_PACKING");
  if (items.length === 0) {
    container.innerHTML = `<tr><td colspan="3" class="empty-state">Tidak ada data.</td></tr>`;
    return;
  }

  const grouped = groupAndSum(items, "namaBarang");
  let grandTotal = 0;

  Object.keys(grouped).sort().forEach(cust => {
    let custTotal = 0;
    Object.keys(grouped[cust]).sort().forEach(nama => {
      const weight = grouped[cust][nama];
      custTotal += weight;
      grandTotal += weight;
      
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${cust}</td>
        <td>${nama}</td>
        <td>${formatNumber(weight)} g</td>
      `;
      container.appendChild(row);
    });

    const totalRow = document.createElement("tr");
    totalRow.className = "row-total";
    totalRow.innerHTML = `
      <td>${cust} Total</td>
      <td></td>
      <td>${formatNumber(custTotal)} g</td>
    `;
    container.appendChild(totalRow);
  });

  const grandRow = document.createElement("tr");
  grandRow.className = "row-grand-total";
  grandRow.innerHTML = `
    <td>Grand Total</td>
    <td></td>
    <td>${formatNumber(grandTotal)} g</td>
  `;
  container.appendChild(grandRow);
}

function renderOutspekTable() {
  const container = document.getElementById("outspek-table-body");
  container.innerHTML = "";

  const items = state.stock.filter(item => item.status === "OUTSPEK");
  if (items.length === 0) {
    container.innerHTML = `<tr><td colspan="10" class="empty-state">Tidak ada data outspek.</td></tr>`;
    return;
  }

  // Structure: outspekGrouped[Customer][AsalBarang] = { PT: x, PB: y, ... , Total: z }
  const outspekGrouped = {};
  items.forEach(item => {
    const cust = item.customer;
    const asal = item.asalBarang;
    
    if (!outspekGrouped[cust]) outspekGrouped[cust] = {};
    if (!outspekGrouped[cust][asal]) {
      outspekGrouped[cust][asal] = { Total: 0 };
      COLORS.forEach(c => outspekGrouped[cust][asal][c] = 0);
    }
    
    const breakdown = item.warnaBreakdown || {};
    let itemTotal = 0;
    
    COLORS.forEach(c => {
      const w = breakdown[c] || 0;
      outspekGrouped[cust][asal][c] += w;
      itemTotal += w;
    });
    
    outspekGrouped[cust][asal].Total += itemTotal;
  });

  // Calculate totals by Customer and Grand Totals
  const custTotals = {};
  const grandTotals = { Total: 0 };
  COLORS.forEach(c => grandTotals[c] = 0);

  Object.keys(outspekGrouped).sort().forEach(cust => {
    custTotals[cust] = { Total: 0 };
    COLORS.forEach(c => custTotals[cust][c] = 0);

    Object.keys(outspekGrouped[cust]).sort().forEach(asal => {
      const data = outspekGrouped[cust][asal];
      
      const row = document.createElement("tr");
      let colsHTML = `<td>${cust}</td><td>${asal}</td>`;
      
      COLORS.forEach(c => {
        const val = data[c];
        colsHTML += `<td>${val > 0 ? formatNumber(val) : '-'}</td>`;
        
        // Add to customer totals
        custTotals[cust][c] += val;
        custTotals[cust].Total += val;
        
        // Add to grand totals
        grandTotals[c] += val;
        grandTotals.Total += val;
      });
      
      colsHTML += `<td style="font-weight: 600;">${formatNumber(data.Total)}</td>`;
      row.innerHTML = colsHTML;
      container.appendChild(row);
    });

    // Render Customer Total Row
    const totalRow = document.createElement("tr");
    totalRow.className = "row-total";
    let totalColsHTML = `<td>${cust} Total</td><td></td>`;
    
    COLORS.forEach(c => {
      const val = custTotals[cust][c];
      totalColsHTML += `<td>${val > 0 ? formatNumber(val) : '-'}</td>`;
    });
    
    totalColsHTML += `<td>${formatNumber(custTotals[cust].Total)}</td>`;
    totalRow.innerHTML = totalColsHTML;
    container.appendChild(totalRow);
  });

  // Render Grand Total Row
  const grandRow = document.createElement("tr");
  grandRow.className = "row-grand-total";
  let grandColsHTML = `<td>Grand Total</td><td></td>`;
  
  COLORS.forEach(c => {
    const val = grandTotals[c];
    grandColsHTML += `<td>${val > 0 ? formatNumber(val) : '-'}</td>`;
  });
  
  grandColsHTML += `<td>${formatNumber(grandTotals.Total)}</td>`;
  grandRow.innerHTML = grandColsHTML;
  container.appendChild(grandRow);
}

// Render Board (Tab 2)
function renderBoard() {
  const columns = {
    TIDAK_PO: document.getElementById("col-tidak-po"),
    PO_TERBARU: document.getElementById("col-po-terbaru"),
    OUTSPEK: document.getElementById("col-outspek"),
    STOK_PACKING: document.getElementById("col-stok-packing")
  };

  // Clear column counts and cards
  Object.keys(columns).forEach(status => {
    columns[status].innerHTML = "";
    document.getElementById(`count-${status.toLowerCase().replace('_', '-')}`).innerText = "0";
  });

  // Keep track of card counts
  const counts = { TIDAK_PO: 0, PO_TERBARU: 0, OUTSPEK: 0, STOK_PACKING: 0 };

  state.stock.forEach(item => {
    const status = item.status;
    if (!columns[status]) return;
    
    counts[status]++;
    
    const card = document.createElement("div");
    card.className = "stock-card";
    card.draggable = true;
    card.dataset.id = item.id;
    
    card.addEventListener("dragstart", handleDragStart);
    card.addEventListener("dragend", handleDragEnd);

    // Build color pills if Outspek
    let pillsHTML = "";
    if (status === "OUTSPEK" && item.warnaBreakdown) {
      pillsHTML = `<div class="color-pills-container">`;
      Object.keys(item.warnaBreakdown).forEach(color => {
        const wt = item.warnaBreakdown[color];
        if (wt > 0) {
          pillsHTML += `<span class="color-pill">${color}: ${wt}g</span>`;
        }
      });
      pillsHTML += `</div>`;
    }

    card.innerHTML = `
      <div class="card-top">
        <span class="card-id">${item.id}</span>
        <span class="badge ${getBadgeClass(status)}">${status.replace('_', ' ')}</span>
      </div>
      <div>
        <div class="card-cust">${item.customer}</div>
        <div class="card-body-text">${status === 'STOK_PACKING' ? 'Nama Barang: ' + item.namaBarang : 'Asal: ' + item.asalBarang}</div>
        ${pillsHTML}
      </div>
      <div class="card-footer-info">
        <div class="card-weight">${formatNumber(item.berat)} <span>g</span></div>
        <div class="card-actions">
          <button class="card-btn" onclick="openEditModal('${item.id}')" title="Edit Card">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
          </button>
          <button class="card-btn" onclick="deleteItem('${item.id}')" title="Delete Card" style="color: var(--color-outspek);">
            <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" stroke-width="2" fill="none"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
        </div>
      </div>
    `;

    columns[status].appendChild(card);
  });

  // Update badge headers counts
  Object.keys(counts).forEach(status => {
    document.getElementById(`count-${status.toLowerCase().replace('_', '-')}`).innerText = counts[status];
  });
}

function getBadgeClass(status) {
  if (status === "TIDAK_PO") return "badge-tidak-po";
  if (status === "PO_TERBARU") return "badge-po-terbaru";
  if (status === "OUTSPEK") return "badge-outspek";
  if (status === "STOK_PACKING") return "badge-stok-packing";
  return "";
}

// Render Outspek Matcher & Merger (Tab 3)
function renderOutspekMatcher() {
  const container = document.getElementById("outspek-matcher-colors");
  container.innerHTML = "";

  // 1. Group outspek items by Color
  const items = state.stock.filter(item => item.status === "OUTSPEK");
  const colorGroups = {};
  COLORS.forEach(c => colorGroups[c] = []);

  items.forEach(item => {
    const breakdown = item.warnaBreakdown || {};
    COLORS.forEach(color => {
      const weight = breakdown[color] || 0;
      if (weight > 0) {
        colorGroups[color].push({
          itemId: item.id,
          customer: item.customer,
          asalBarang: item.asalBarang,
          weight: weight
        });
      }
    });
  });

  // 2. Render each color group if it has items
  let hasItems = false;
  COLORS.forEach(color => {
    const groupItems = colorGroups[color];
    if (groupItems.length === 0) return;
    hasItems = true;

    const groupDiv = document.createElement("div");
    groupDiv.className = "outspek-color-group";

    const header = document.createElement("div");
    header.className = "color-group-header";
    header.innerHTML = `
      <span class="color-group-title">
        <span class="color-dot ${color}"></span>
        Warna: ${color}
      </span>
      <span class="badge badge-outspek">${groupItems.length} lot</span>
    `;
    groupDiv.appendChild(header);

    const itemsContainer = document.createElement("div");
    itemsContainer.className = "color-group-items";

    groupItems.forEach((gItem, idx) => {
      const matchRow = document.createElement("div");
      matchRow.className = "outspek-match-row";
      
      const isChecked = state.selectedMergeItems.some(
        sel => sel.itemId === gItem.itemId && sel.color === color
      );

      matchRow.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <input type="checkbox" class="match-checkbox" 
            data-item-id="${gItem.itemId}" 
            data-color="${color}" 
            data-weight="${gItem.weight}"
            data-customer="${gItem.customer}"
            ${isChecked ? 'checked' : ''}
            onchange="handleMergeCheckboxChange(this)"
          >
          <div>
            <div style="font-weight: 600;">${gItem.customer}</div>
            <div style="font-size: 0.8rem; color: var(--color-text-secondary);">${gItem.asalBarang} (${gItem.itemId})</div>
          </div>
        </div>
        <div style="font-family: var(--font-title); font-weight: 700;">${formatNumber(gItem.weight)} g</div>
      `;
      itemsContainer.appendChild(matchRow);
    });

    groupDiv.appendChild(itemsContainer);
    container.appendChild(groupDiv);
  });

  if (!hasItems) {
    container.innerHTML = `
      <div class="empty-state">
        <svg viewBox="0 0 24 24" width="48" height="48" stroke="currentColor" stroke-width="1.5" fill="none"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        <p>Tidak ada stok Outspek saat ini. Semua barang telah dipindahkan atau dikemas!</p>
      </div>
    `;
  }

  renderMergeSummary();
}

// Checkbox select handler in Matcher tab
function handleMergeCheckboxChange(cb) {
  const itemId = cb.dataset.itemId;
  const color = cb.dataset.color;
  const weight = parseFloat(cb.dataset.weight);
  const customer = cb.dataset.customer;

  if (cb.checked) {
    state.selectedMergeItems.push({ itemId, color, weight, customer });
  } else {
    state.selectedMergeItems = state.selectedMergeItems.filter(
      item => !(item.itemId === itemId && item.color === color)
    );
  }
  renderMergeSummary();
}

// Render the right panel in Matcher (Tab 3) showing what is selected and the sum
function renderMergeSummary() {
  const container = document.getElementById("merge-selected-list");
  container.innerHTML = "";

  const summaryWeightEl = document.getElementById("merge-total-weight");
  const mergeBtn = document.getElementById("btn-merge-action");
  
  if (state.selectedMergeItems.length === 0) {
    container.innerHTML = `<div class="color-text-muted" style="text-align: center; font-size: 0.85rem;">Pilih warna barang outspek di sebelah kiri untuk digabungkan.</div>`;
    summaryWeightEl.innerText = "0 g";
    mergeBtn.disabled = true;
    
    // reset form fields
    document.getElementById("merge-customer").value = "";
    return;
  }

  mergeBtn.disabled = false;
  let totalWeight = 0;
  
  // Suggest Customer from the first checked item
  const suggestedCustomer = state.selectedMergeItems[0].customer;
  document.getElementById("merge-customer").value = suggestedCustomer;

  state.selectedMergeItems.forEach(item => {
    totalWeight += item.weight;
    
    const row = document.createElement("div");
    row.className = "selected-item-row";
    row.innerHTML = `
      <span>[${item.color}] ${item.customer} (${item.itemId})</span>
      <span style="font-weight: 600;">${formatNumber(item.weight)} g</span>
    `;
    container.appendChild(row);
  });

  summaryWeightEl.innerText = `${formatNumber(totalWeight)} g`;
}

// Core function: Merge the selected Outspek colors into a new packed item
function executeMerge() {
  if (state.selectedMergeItems.length === 0) return;

  const targetCustomer = document.getElementById("merge-customer").value.trim();
  const namaBarang = document.getElementById("merge-nama-barang").value.trim();

  if (!targetCustomer) {
    showToast("Silakan tentukan Customer untuk barang packing.", "error");
    return;
  }
  if (!namaBarang) {
    showToast("Silakan tentukan Nama Barang hasil packing (misal: S1, K1).", "error");
    return;
  }

  let totalMergedWeight = 0;

  // 1. Process and deduct from original items
  state.selectedMergeItems.forEach(sel => {
    const stockItem = state.stock.find(item => item.id === sel.itemId);
    if (stockItem && stockItem.warnaBreakdown) {
      const colorWeight = stockItem.warnaBreakdown[sel.color] || 0;
      
      // Deduct weight
      stockItem.warnaBreakdown[sel.color] = 0;
      stockItem.berat -= colorWeight;
      totalMergedWeight += colorWeight;

      // Clean up if item weight becomes 0 or less
      if (stockItem.berat <= 0) {
        state.stock = state.stock.filter(item => item.id !== stockItem.id);
      }
    }
  });

  // 2. Add new item to STOK_PACKING
  const newPackingItem = {
    id: `S-${Date.now().toString().slice(-4)}`,
    customer: targetCustomer,
    namaBarang: namaBarang,
    status: "STOK_PACKING",
    berat: totalMergedWeight
  };
  state.stock.push(newPackingItem);

  // 3. Clear selected list & save
  state.selectedMergeItems = [];
  saveData();
  renderAll();

  // Reset form fields
  document.getElementById("merge-nama-barang").value = "";
  
  showToast(`Berhasil menyatukan ${formatNumber(totalMergedWeight)}g ke dalam Stok Packing (${namaBarang})!`);
}

// Drag & Drop Mechanics
let draggedItemId = null;

function handleDragStart(e) {
  draggedItemId = this.dataset.id;
  this.style.opacity = "0.5";
  e.dataTransfer.setData("text/plain", draggedItemId);
}

function handleDragEnd() {
  this.style.opacity = "1";
  const dropzones = document.querySelectorAll(".cards-container");
  dropzones.forEach(dz => dz.classList.remove("drag-over"));
}

function setupDragDrop() {
  const containers = document.querySelectorAll(".cards-container");
  
  containers.forEach(container => {
    container.addEventListener("dragover", (e) => {
      e.preventDefault();
      container.classList.add("drag-over");
    });

    container.addEventListener("dragleave", () => {
      container.classList.remove("drag-over");
    });

    container.addEventListener("drop", (e) => {
      e.preventDefault();
      container.classList.remove("drag-over");
      
      const id = e.dataTransfer.getData("text/plain");
      const targetStatus = container.id.replace("col-", "").toUpperCase().replace("-", "_");
      
      moveItemStatus(id, targetStatus);
    });
  });
}

// Move item to a different status, handles necessary transitions
function moveItemStatus(itemId, newStatus) {
  const item = state.stock.find(i => i.id === itemId);
  if (!item) return;
  if (item.status === newStatus) return;

  // Intercept if moving to Outspek to get color breakdown
  if (newStatus === "OUTSPEK") {
    openMoveToOutspekModal(itemId);
    return;
  }

  // Intercept if moving to Stok Packing to get Nama Barang
  if (newStatus === "STOK_PACKING") {
    openMoveToPackingModal(itemId);
    return;
  }

  // Standard move to TIDAK_PO or PO_TERBARU
  item.status = newStatus;
  
  // Clean up unused properties
  delete item.warnaBreakdown;
  delete item.namaBarang;
  
  saveData();
  renderAll();
  showToast(`Item ${itemId} dipindahkan ke ${newStatus.replace('_', ' ')}.`);
}

// Add New Lot / Item Handler
function handleAddItemForm(e) {
  e.preventDefault();
  
  const customer = document.getElementById("add-customer").value.trim();
  const status = document.getElementById("add-status").value;
  const asalBarang = document.getElementById("add-asal").value.trim();
  const namaBarang = document.getElementById("add-nama").value.trim();
  
  if (!customer) {
    showToast("Customer harus diisi", "error");
    return;
  }

  let weight = 0;
  let breakdown = {};

  if (status === "OUTSPEK") {
    // Sum from color breakdown fields
    COLORS.forEach(c => {
      const val = parseFloat(document.getElementById(`color-add-${c}`).value) || 0;
      if (val > 0) {
        breakdown[c] = val;
        weight += val;
      }
    });

    if (weight <= 0) {
      showToast("Untuk status OUTSPEK, isi minimal satu berat warna.", "error");
      return;
    }
  } else {
    weight = parseFloat(document.getElementById("add-berat").value) || 0;
    if (weight <= 0) {
      showToast("Berat barang harus lebih besar dari 0.", "error");
      return;
    }
  }

  const prefix = status === "TIDAK_PO" ? "T" : (status === "PO_TERBARU" ? "P" : (status === "OUTSPEK" ? "O" : "S"));
  const newId = `${prefix}-${Date.now().toString().slice(-4)}`;

  const newItem = {
    id: newId,
    customer: customer,
    status: status,
    berat: weight
  };

  if (status === "STOK_PACKING") {
    newItem.namaBarang = namaBarang || "S1";
  } else {
    newItem.asalBarang = asalBarang || "Umum";
  }

  if (status === "OUTSPEK") {
    newItem.warnaBreakdown = breakdown;
  }

  state.stock.push(newItem);
  saveData();
  renderAll();
  closeModal("add-modal");
  
  // reset form
  document.getElementById("add-form").reset();
  toggleFormFieldsBasedOnStatus("add-status", "add-form");
  
  showToast(`Berhasil menambahkan lot ${newId}!`);
}

// Edit Modal Handler
let editingItemId = null;

function openEditModal(id) {
  const item = state.stock.find(i => i.id === id);
  if (!item) return;

  editingItemId = id;
  document.getElementById("edit-title").innerText = `Edit Lot ${id}`;
  document.getElementById("edit-customer").value = item.customer;
  document.getElementById("edit-status").value = item.status;
  
  // Prep form inputs based on status
  toggleFormFieldsBasedOnStatus("edit-status", "edit-form");

  if (item.status === "STOK_PACKING") {
    document.getElementById("edit-nama").value = item.namaBarang || "";
    document.getElementById("edit-berat").value = item.berat;
  } else if (item.status === "OUTSPEK") {
    document.getElementById("edit-asal").value = item.asalBarang || "";
    // populate color values
    const breakdown = item.warnaBreakdown || {};
    COLORS.forEach(c => {
      document.getElementById(`color-edit-${c}`).value = breakdown[c] || "";
    });
  } else {
    document.getElementById("edit-asal").value = item.asalBarang || "";
    document.getElementById("edit-berat").value = item.berat;
  }

  openModal("edit-modal");
}

function handleEditItemForm(e) {
  e.preventDefault();
  const item = state.stock.find(i => i.id === editingItemId);
  if (!item) return;

  const customer = document.getElementById("edit-customer").value.trim();
  const status = document.getElementById("edit-status").value;
  const asalBarang = document.getElementById("edit-asal").value.trim();
  const namaBarang = document.getElementById("edit-nama").value.trim();

  if (!customer) {
    showToast("Customer harus diisi", "error");
    return;
  }

  item.customer = customer;
  item.status = status;

  if (status === "OUTSPEK") {
    item.asalBarang = asalBarang || "Umum";
    let weight = 0;
    let breakdown = {};
    
    COLORS.forEach(c => {
      const val = parseFloat(document.getElementById(`color-edit-${c}`).value) || 0;
      if (val > 0) {
        breakdown[c] = val;
        weight += val;
      }
    });

    if (weight <= 0) {
      showToast("Isi minimal satu berat warna untuk status OUTSPEK.", "error");
      return;
    }

    item.berat = weight;
    item.warnaBreakdown = breakdown;
    delete item.namaBarang;
  } else if (status === "STOK_PACKING") {
    const weight = parseFloat(document.getElementById("edit-berat").value) || 0;
    if (weight <= 0) {
      showToast("Berat barang harus lebih besar dari 0.", "error");
      return;
    }
    item.namaBarang = namaBarang || "S1";
    item.berat = weight;
    delete item.asalBarang;
    delete item.warnaBreakdown;
  } else {
    const weight = parseFloat(document.getElementById("edit-berat").value) || 0;
    if (weight <= 0) {
      showToast("Berat barang harus lebih besar dari 0.", "error");
      return;
    }
    item.asalBarang = asalBarang || "Umum";
    item.berat = weight;
    delete item.namaBarang;
    delete item.warnaBreakdown;
  }

  saveData();
  renderAll();
  closeModal("edit-modal");
  showToast(`Item ${editingItemId} berhasil diupdate.`);
}

// Delete item lot
function deleteItem(id) {
  if (confirm(`Apakah Anda yakin ingin menghapus lot ${id}?`)) {
    state.stock = state.stock.filter(item => item.id !== id);
    saveData();
    renderAll();
    showToast(`Lot ${id} berhasil dihapus.`);
  }
}

// Modal intercept for moving items to Outspek
let targetMoveToOutspekId = null;

function openMoveToOutspekModal(id) {
  targetMoveToOutspekId = id;
  const item = state.stock.find(i => i.id === id);
  if (!item) return;

  document.getElementById("outspek-move-title").innerText = `Rincian Warna Outspek - ${id}`;
  document.getElementById("outspek-move-asal").value = item.asalBarang || "";
  document.getElementById("outspek-move-weight-hint").innerText = item.berat;

  // Clear previous values
  COLORS.forEach(c => {
    document.getElementById(`color-move-${c}`).value = "";
  });

  // Suggest putting all weight in PB (Putih Beras) by default
  document.getElementById("color-move-PB").value = item.berat;

  openModal("outspek-move-modal");
}

function handleMoveToOutspekForm(e) {
  e.preventDefault();
  const item = state.stock.find(i => i.id === targetMoveToOutspekId);
  if (!item) return;

  const asal = document.getElementById("outspek-move-asal").value.trim();
  const expectedWeight = item.berat;
  
  let totalInputWeight = 0;
  let breakdown = {};

  COLORS.forEach(c => {
    const val = parseFloat(document.getElementById(`color-move-${c}`).value) || 0;
    if (val > 0) {
      breakdown[c] = val;
      totalInputWeight += val;
    }
  });

  if (Math.abs(totalInputWeight - expectedWeight) > 0.01) {
    if (!confirm(`Total berat warna (${totalInputWeight}g) tidak sama dengan berat asal (${expectedWeight}g). Apakah Anda yakin ingin mengupdate berat barang menjadi ${totalInputWeight}g?`)) {
      return;
    }
  }

  // Update item details
  item.status = "OUTSPEK";
  item.asalBarang = asal || "Umum";
  item.berat = totalInputWeight;
  item.warnaBreakdown = breakdown;
  delete item.namaBarang;

  saveData();
  renderAll();
  closeModal("outspek-move-modal");
  showToast(`Item ${item.id} berhasil diubah ke OUTSPEK.`);
}

// Modal intercept for moving items to Packing
let targetMoveToPackingId = null;

function openMoveToPackingModal(id) {
  targetMoveToPackingId = id;
  const item = state.stock.find(i => i.id === id);
  if (!item) return;

  document.getElementById("packing-move-title").innerText = `Nama Barang Packing - ${id}`;
  document.getElementById("packing-move-nama").value = "";

  openModal("packing-move-modal");
}

function handleMoveToPackingForm(e) {
  e.preventDefault();
  const item = state.stock.find(i => i.id === targetMoveToPackingId);
  if (!item) return;

  const namaBarang = document.getElementById("packing-move-nama").value.trim();
  if (!namaBarang) {
    showToast("Tentukan nama barang packing (misal: S1).", "error");
    return;
  }

  item.status = "STOK_PACKING";
  item.namaBarang = namaBarang;
  delete item.asalBarang;
  delete item.warnaBreakdown;

  saveData();
  renderAll();
  closeModal("packing-move-modal");
  showToast(`Item ${item.id} berhasil dikemas sebagai ${namaBarang}.`);
}

// Handle Form fields toggle depending on Status
function toggleFormFieldsBasedOnStatus(statusElementId, formElementId) {
  const status = document.getElementById(statusElementId).value;
  const form = document.getElementById(formElementId);
  
  const asalWrapper = form.querySelector(".field-asal-wrapper");
  const namaWrapper = form.querySelector(".field-nama-wrapper");
  const beratWrapper = form.querySelector(".field-berat-wrapper");
  const colorsWrapper = form.querySelector(".field-colors-wrapper");

  if (status === "OUTSPEK") {
    if (asalWrapper) asalWrapper.style.display = "block";
    if (namaWrapper) namaWrapper.style.display = "none";
    if (beratWrapper) beratWrapper.style.display = "none";
    if (colorsWrapper) colorsWrapper.style.display = "block";
  } else if (status === "STOK_PACKING") {
    if (asalWrapper) asalWrapper.style.display = "none";
    if (namaWrapper) namaWrapper.style.display = "block";
    if (beratWrapper) beratWrapper.style.display = "block";
    if (colorsWrapper) colorsWrapper.style.display = "none";
  } else {
    if (asalWrapper) asalWrapper.style.display = "block";
    if (namaWrapper) namaWrapper.style.display = "none";
    if (beratWrapper) beratWrapper.style.display = "block";
    if (colorsWrapper) colorsWrapper.style.display = "none";
  }
}

// Navigation Tab Switches
function switchTab(tabId) {
  document.querySelectorAll(".nav-item").forEach(item => {
    item.classList.remove("active");
  });
  document.querySelectorAll(".tab-panel").forEach(panel => {
    panel.classList.remove("active");
  });

  const activeBtn = Array.from(document.querySelectorAll(".nav-item")).find(btn => btn.dataset.tab === tabId);
  if (activeBtn) activeBtn.classList.add("active");
  
  const activePanel = document.getElementById(tabId);
  if (activePanel) activePanel.classList.add("active");
}

// Modal utility functions
function openModal(modalId) {
  document.getElementById(modalId).classList.add("active");
}

function closeModal(modalId) {
  document.getElementById(modalId).classList.remove("active");
}

// Import & Export functions
function exportJSON() {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.stock, null, 2));
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `walet_stock_data_${new Date().toISOString().slice(0,10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("File data JSON berhasil diekspor.");
}

function triggerImport() {
  document.getElementById("import-file-input").click();
}

function importJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = function(evt) {
    try {
      const data = JSON.parse(evt.target.result);
      if (Array.isArray(data)) {
        state.stock = data;
        saveData();
        renderAll();
        showToast("Data stok berhasil diimpor!");
      } else {
        showToast("Format file tidak valid (harus array JSON).", "error");
      }
    } catch (err) {
      showToast("Gagal membaca file JSON.", "error");
      console.error(err);
    }
  };
  reader.readAsText(file);
}

// Export dynamic pivot tables to CSV
function exportCSV() {
  let csvContent = "";
  
  // 1. TIDAK PO Table
  csvContent += "=== TABEL TIDAK PO ===\n";
  csvContent += "Customer,Asal Barang,Total Berat (g)\n";
  const tidakPO = state.stock.filter(item => item.status === "TIDAK_PO");
  const groupedTidakPO = groupAndSum(tidakPO, "asalBarang");
  Object.keys(groupedTidakPO).sort().forEach(cust => {
    let custTotal = 0;
    Object.keys(groupedTidakPO[cust]).sort().forEach(asal => {
      csvContent += `"${cust}","${asal}",${groupedTidakPO[cust][asal]}\n`;
      custTotal += groupedTidakPO[cust][asal];
    });
    csvContent += `"${cust} Total",,${custTotal}\n`;
  });
  csvContent += "\n";

  // 2. PO TERBARU Table
  csvContent += "=== TABEL PO TERBARU ===\n";
  csvContent += "Customer,Asal Barang,Total Berat (g)\n";
  const poTerbaru = state.stock.filter(item => item.status === "PO_TERBARU");
  const groupedPO = groupAndSum(poTerbaru, "asalBarang");
  Object.keys(groupedPO).sort().forEach(cust => {
    let custTotal = 0;
    Object.keys(groupedPO[cust]).sort().forEach(asal => {
      csvContent += `"${cust}","${asal}",${groupedPO[cust][asal]}\n`;
      custTotal += groupedPO[cust][asal];
    });
    csvContent += `"${cust} Total",,${custTotal}\n`;
  });
  csvContent += "\n";

  // 3. STOK PACKING Table
  csvContent += "=== TABEL STOK PACKING ===\n";
  csvContent += "Customer,Nama Barang,Total Berat (g)\n";
  const packing = state.stock.filter(item => item.status === "STOK_PACKING");
  const groupedPacking = groupAndSum(packing, "namaBarang");
  Object.keys(groupedPacking).sort().forEach(cust => {
    let custTotal = 0;
    Object.keys(groupedPacking[cust]).sort().forEach(nama => {
      csvContent += `"${cust}","${nama}",${groupedPacking[cust][nama]}\n`;
      custTotal += groupedPacking[cust][nama];
    });
    csvContent += `"${cust} Total",,${custTotal}\n`;
  });
  csvContent += "\n";

  // 4. OUTSPEK Table
  csvContent += "=== TABEL OUTSPEK ===\n";
  csvContent += `Customer,Asal Barang,${COLORS.join(",")},Total (g)\n`;
  const outspek = state.stock.filter(item => item.status === "OUTSPEK");
  const outspekGrouped = {};
  outspek.forEach(item => {
    const cust = item.customer;
    const asal = item.asalBarang;
    if (!outspekGrouped[cust]) outspekGrouped[cust] = {};
    if (!outspekGrouped[cust][asal]) {
      outspekGrouped[cust][asal] = { Total: 0 };
      COLORS.forEach(c => outspekGrouped[cust][asal][c] = 0);
    }
    const breakdown = item.warnaBreakdown || {};
    COLORS.forEach(c => {
      const w = breakdown[c] || 0;
      outspekGrouped[cust][asal][c] += w;
      outspekGrouped[cust][asal].Total += w;
    });
  });

  Object.keys(outspekGrouped).sort().forEach(cust => {
    let custColors = { Total: 0 };
    COLORS.forEach(c => custColors[c] = 0);

    Object.keys(outspekGrouped[cust]).sort().forEach(asal => {
      const data = outspekGrouped[cust][asal];
      let rowParts = [`"${cust}"`, `"${asal}"`];
      COLORS.forEach(c => {
        rowParts.push(data[c]);
        custColors[c] += data[c];
        custColors.Total += data[c];
      });
      rowParts.push(data.Total);
      csvContent += rowParts.join(",") + "\n";
    });

    let totalRowParts = [`"${cust} Total"`, ""];
    COLORS.forEach(c => totalRowParts.push(custColors[c]));
    totalRowParts.push(custColors.Total);
    csvContent += totalRowParts.join(",") + "\n";
  });

  // Download CSV
  const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
  const downloadAnchor = document.createElement("a");
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `walet_stock_summary_${new Date().toISOString().slice(0,10)}.csv`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
  showToast("File CSV ringkasan berhasil diekspor.");
}

// Toast Notifications
function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = `toast ${type === 'error' ? 'error' : ''}`;
  
  const icon = type === "error" 
    ? `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" style="flex-shrink:0;"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`
    : `<svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" stroke-width="2" fill="none" style="flex-shrink:0;"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;

  toast.innerHTML = `
    ${icon}
    <div style="font-size: 0.85rem; font-weight: 500;">${message}</div>
  `;
  
  container.appendChild(toast);
  
  // trigger animation
  setTimeout(() => toast.classList.add("show"), 50);
  
  // remove after 3.5s
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 350);
  }, 3500);
}

// Setup Event Listeners
function setupEventListeners() {
  // Navigation tabs
  document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("click", () => {
      if (item.dataset.tab) {
        switchTab(item.dataset.tab);
      }
    });
  });

  // Modal open buttons
  document.getElementById("btn-add-item").addEventListener("click", () => {
    document.getElementById("add-form").reset();
    toggleFormFieldsBasedOnStatus("add-status", "add-form");
    openModal("add-modal");
  });

  // Modal forms submit handlers
  document.getElementById("add-form").addEventListener("submit", handleAddItemForm);
  document.getElementById("edit-form").addEventListener("submit", handleEditItemForm);
  document.getElementById("outspek-move-form").addEventListener("submit", handleMoveToOutspekForm);
  document.getElementById("packing-move-form").addEventListener("submit", handleMoveToPackingForm);

  // Status switches in forms to toggle fields dynamically
  document.getElementById("add-status").addEventListener("change", () => {
    toggleFormFieldsBasedOnStatus("add-status", "add-form");
  });
  document.getElementById("edit-status").addEventListener("change", () => {
    toggleFormFieldsBasedOnStatus("edit-status", "edit-form");
  });

  // Merge execution button
  document.getElementById("btn-merge-action").addEventListener("click", executeMerge);

  // Drag and drop initialization
  setupDragDrop();
}
