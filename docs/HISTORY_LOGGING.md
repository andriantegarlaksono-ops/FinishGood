# History Logging System Documentation

## Overview

History Logging System adalah fitur untuk melacak dan mencatat setiap perubahan, perpindahan, dan split di aplikasi FinishGood. Sistem ini menyimpan data di `localStorage` dan menyediakan interface visual yang intuitif.

## Komponen Utama

### 1. **HistoryLogger** (`js/modules/history-logger.js`)
Module inti yang menangani pencatatan dan penyimpanan history.

#### Instalasi
```javascript
// Include di HTML
<script src="js/modules/history-logger.js"></script>

// Inisialisasi
const historyLogger = new HistoryLogger('app_history_log');
```

#### API Methods

##### Pencatatan Aktivitas

**`logMovement(entry)`**
Mencatat perpindahan/perubahan state umum.

```javascript
historyLogger.logMovement({
  action: 'move',                    // split, move, transfer, status_change
  fromState: 'Warehouse A',          // Lokasi/state asal
  toState: 'Warehouse B',            // Lokasi/state tujuan
  itemId: 'ITEM-001',               // ID item yang dipindahkan
  itemName: 'Product X',            // Nama item
  userId: 'user123',                // ID user yang melakukan aksi
  notes: 'Pindah karena stock opname', // Catatan opsional
  metadata: {                        // Data tambahan (opsional)
    quantity: 100,
    reason: 'rebalancing'
  }
});
```

**`logSplit(entry)`**
Mencatat aksi split/pembagian item.

```javascript
historyLogger.logSplit({
  sourceContainer: 'Main Store',    // Tempat asal
  targetContainer: 'Sub Store',     // Tempat tujuan
  itemId: 'ITEM-001',
  itemName: 'Product X',
  sourceQuantity: 500,              // Jumlah awal
  splitQuantity: 200,               // Jumlah yang dipindahkan
  remainingQuantity: 300,           // Sisa di tempat asal
  userId: 'user123',
  notes: 'Split untuk restock cabang'
});
```

##### Pengambilan Data

**`getHistory()`**
Mendapatkan seluruh riwayat.
```javascript
const allHistory = historyLogger.getHistory();
```

**`getItemHistory(itemId)`**
Mendapatkan riwayat untuk item spesifik.
```javascript
const itemHistory = historyLogger.getItemHistory('ITEM-001');
```

**`getMovementPath(itemId)`**
Mendapatkan path perpindahan item dari awal hingga akhir.
```javascript
const path = historyLogger.getMovementPath('ITEM-001');
// Output: [{timestamp, from, to, action}, ...]
```

**`getHistoryByDateRange(startDate, endDate)`**
Filter riwayat berdasarkan range tanggal.
```javascript
const march = historyLogger.getHistoryByDateRange(
  new Date('2026-03-01'),
  new Date('2026-03-31')
);
```

**`getHistoryByAction(actionType)`**
Filter riwayat berdasarkan tipe aksi.
```javascript
const splits = historyLogger.getHistoryByAction('split');
```

**`getHistoryByUser(userId)`**
Filter riwayat berdasarkan user.
```javascript
const userActions = historyLogger.getHistoryByUser('user123');
```

**`getRecentHistory(limit)`**
Mendapatkan history terbaru.
```javascript
const recent10 = historyLogger.getRecentHistory(10);
```

**`searchHistory(searchTerm)`**
Cari history berdasarkan keyword.
```javascript
const results = historyLogger.searchHistory('product x');
```

##### Export & Utility

**`exportAsJSON()`**
Export history sebagai JSON.
```javascript
const jsonData = historyLogger.exportAsJSON();
```

**`exportAsCSV()`**
Export history sebagai CSV.
```javascript
const csvData = historyLogger.exportAsCSV();
```

**`clearHistory(confirm)`**
Hapus semua history (memerlukan konfirmasi).
```javascript
historyLogger.clearHistory(true);
```

### 2. **HistoryUI** (`js/modules/history-ui.js`)
Controller UI untuk rendering dan interaksi dengan panel history.

#### Instalasi
```html
<!-- Include stylesheet -->
<link rel="stylesheet" href="css/history.css">

<!-- Include HTML template -->
<script src="html/history-panel.html"></script>

<!-- Include scripts -->
<script src="js/modules/history-logger.js"></script>
<script src="js/modules/history-ui.js"></script>

<!-- Initialize -->
<script>
  const historyLogger = new HistoryLogger();
  const historyUI = new HistoryUI(historyLogger);
</script>
```

#### Features

1. **Timeline View** - Visual timeline dengan marker berwarna
2. **Filtering** - Filter berdasarkan:
   - Search keyword (nama item, ID, catatan)
   - Tipe aksi
   - Tanggal
   - User
3. **Statistics** - Menampilkan:
   - Total aktivitas
   - Aktivitas hari ini
   - Jumlah user aktif
4. **Export** - Export ke JSON atau CSV
5. **Detail Modal** - Lihat detail lengkap setiap history entry

## Penggunaan Praktis

### Contoh: Logging Split di Aplikasi

```javascript
// Saat user melakukan split
function handleSplit(sourceItem, targetItem, quantity, notes) {
  // ... proses split di aplikasi
  
  // Log ke history
  historyLogger.logSplit({
    sourceContainer: sourceItem.location,
    targetContainer: targetItem.location,
    itemId: sourceItem.id,
    itemName: sourceItem.name,
    sourceQuantity: sourceItem.quantity,
    splitQuantity: quantity,
    remainingQuantity: sourceItem.quantity - quantity,
    userId: getCurrentUser().id,
    notes: notes
  });
}
```

### Contoh: Melacak Pergerakan Item

```javascript
// Untuk tracking pergerakan suatu item
function trackItemMovement(itemId) {
  const path = historyLogger.getMovementPath(itemId);
  
  console.log(`Pergerakan item ${itemId}:`);
  path.forEach((entry, index) => {
    console.log(`${index + 1}. ${entry.from} → ${entry.to} (${entry.timestamp})`);
  });
}
```

### Contoh: Report History untuk Periode Tertentu

```javascript
// Generate report untuk range tanggal
function generateHistoryReport(startDate, endDate) {
  const history = historyLogger.getHistoryByDateRange(startDate, endDate);
  
  // Group by action
  const grouped = {};
  history.forEach(entry => {
    if (!grouped[entry.action]) grouped[entry.action] = [];
    grouped[entry.action].push(entry);
  });
  
  console.table(grouped);
  return grouped;
}
```

## Data Structure

### History Entry Object
```javascript
{
  id: "1719849600000-abc123def",      // Unique ID
  timestamp: "2026-03-15T14:30:45.123Z", // ISO timestamp
  action: "split",                      // Type of action
  fromState: "Warehouse A",             // Source location/state
  toState: "Warehouse B",               // Target location/state
  itemId: "ITEM-001",                  // Item identifier
  itemName: "Product X",               // Item name
  metadata: {                           // Additional data
    sourceQuantity: 500,
    splitQuantity: 200,
    remainingQuantity: 300
  },
  userId: "user123",                   // User who performed action
  notes: "Monthly rebalancing"         // Optional notes
}
```

## Storage

Data disimpan di `localStorage` dengan key yang dapat dikonfigurasi (default: `app_history_log`).

### Storage Considerations
- **Capacity**: Biasanya 5-10MB per domain
- **Persistence**: Data tetap ada hingga cache dihapus
- **Performance**: Untuk aplikasi production, pertimbangkan migrasi ke IndexedDB

## Styling

### CSS Classes Available
- `.history-panel` - Main container
- `.timeline-entry` - Individual entry
- `.timeline-action` - Action label
- `.timeline-movement` - From/to indicator
- `.timeline-content` - Entry content

### Customization
Modifikasi `css/history.css` untuk styling sesuai kebutuhan.

## Tips & Best Practices

1. **Always provide userId** - Untuk tracking siapa yang melakukan aksi
2. **Use descriptive notes** - Semakin detail catatan, semakin mudah tracking
3. **Standardize locations/states** - Gunakan nama yang konsisten untuk lokasi
4. **Regular exports** - Export history secara berkala untuk backup
5. **Performance** - Untuk aplikasi dengan history besar, pertimbangkan pagination

## Troubleshooting

### History tidak tersimpan?
- Cek apakah localStorage enabled di browser
- Lihat console untuk error messages
- Pastikan key yang digunakan tidak konflik

### UI tidak muncul?
- Pastikan semua file CSS dan JS ter-include
- Cek apakah elemen dengan id `history-panel` ada di DOM
- Lihat console untuk error

### Data hilang?
- localStorage sering dihapus saat clear cache
- Implementasikan backup/export berkala
- Pertimbangkan server-side storage untuk production

## Quick Start

### 1. Add to HTML
```html
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="css/history.css">
</head>
<body>
  <!-- Include history panel HTML -->
  <div id="app">
    <!-- Your app content -->
  </div>
  
  <!-- History Panel -->
  <div id="history-section"></div>

  <script src="js/modules/history-logger.js"></script>
  <script src="js/modules/history-ui.js"></script>
  <script>
    // Initialize
    const historyLogger = new HistoryLogger();
    const historyUI = new HistoryUI(historyLogger);
  </script>
</body>
</html>
```

### 2. Use in Your Application
```javascript
// Saat melakukan split
historyLogger.logSplit({
  sourceContainer: 'Storage A',
  targetContainer: 'Storage B',
  itemId: 'PROD-123',
  itemName: 'Widget',
  sourceQuantity: 100,
  splitQuantity: 50,
  remainingQuantity: 50,
  userId: 'user1'
});
```

### 3. View History
Panel akan automatically render dengan timeline visual yang menampilkan semua aktivitas.

## Future Enhancements

- [ ] Server-side persistence
- [ ] Advanced filtering & search
- [ ] Data visualization & analytics
- [ ] Audit trail dengan digital signature
- [ ] Real-time sync across tabs
- [ ] Mobile-optimized view
- [ ] Backup & restore functionality
- [ ] Integration dengan database

## Support & Contributing

Untuk issue atau request, silakan buat issue di repository.

---

**Version**: 1.0.0  
**Last Updated**: 2026-07-02  
**Author**: FinishGood Team