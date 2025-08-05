const API_URL = "https://script.google.com/macros/s/AKfycbzCXALwtYTNvzZjauBJ_-n6yzB2ul-XdkBEdHaQtKL2rvHM0QZOvu2VhY28wzNmfXL7/exec";

document.addEventListener("DOMContentLoaded", () => {
  loadData();

  const form = document.getElementById("crud-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const id = document.getElementById("id").value;
    const nama = document.getElementById("nama").value;
    const instansi = document.getElementById("instansi").value;
    const keperluan = document.getElementById("keperluan").value;
    const waktu = document.getElementById("waktu").value;

    const data = { id, nama, instansi, keperluan, waktu };

    await fetch(API_URL, {
      method: "POST",
      body: JSON.stringify(data),
    });

    form.reset();
    loadData();
  });
});

async function loadData() {
  const response = await fetch(API_URL);
  const result = await response.json();

  const table = document.getElementById("data-table");
  table.innerHTML = "";

  result.data.forEach((row) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${row.ID}</td>
      <td>${row.NAMA}</td>
      <td>${row.INSTANSI}</td>
      <td>${row.KEPERLUAN}</td>
      <td>${row.WAKTU}</td>
      <td>
        <button class="edit" onclick="editRow('${row.ID}', '${row.NAMA}', '${row.INSTANSI}', '${row.KEPERLUAN}', '${row.WAKTU}')">Edit</button>
        <button class="delete" onclick="deleteRow('${row.ID}')">Hapus</button>
      </td>
    `;

    table.appendChild(tr);
  });
}

function editRow(id, nama, instansi, keperluan, waktu) {
  document.getElementById("id").value = id;
  document.getElementById("nama").value = nama;
  document.getElementById("instansi").value = instansi;
  document.getElementById("keperluan").value = keperluan;
  document.getElementById("waktu").value = waktu;
}

async function deleteRow(id) {
  await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify({ id, action: "delete" }),
  });

  loadData();
}
