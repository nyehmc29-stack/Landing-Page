const gameData = {
  "Mobile Legends": {
    currency: "Diamond",
    nominal: [
      ["86 Diamond", 15000],
      ["172 Diamond", 29000],
      ["257 Diamond", 43000],
      ["344 Diamond", 57000],
      ["429 Diamond", 70000],
      ["706 Diamond", 115000]
    ]
  },
  "Free Fire": {
    currency: "Diamond",
    nominal: [
      ["70 Diamond", 10000],
      ["140 Diamond", 19000],
      ["355 Diamond", 48000],
      ["720 Diamond", 95000],
      ["1450 Diamond", 190000],
      ["2180 Diamond", 285000]
    ]
  },
  "Roblox": {
    currency: "Robux",
    nominal: [
      ["80 Robux", 15000],
      ["400 Robux", 70000],
      ["800 Robux", 135000],
      ["1700 Robux", 270000],
      ["4500 Robux", 680000],
      ["10000 Robux", 1450000]
    ]
  },
  "Valorant": {
    currency: "VP",
    nominal: [
      ["125 VP", 15000],
      ["420 VP", 50000],
      ["700 VP", 80000],
      ["1375 VP", 150000],
      ["2400 VP", 250000],
      ["4000 VP", 400000]
    ]
  }
};

const gameCards = document.querySelectorAll(".game-card");
const selectedGame = document.getElementById("selectedGame");
const nominalLabel = document.getElementById("nominalLabel");
const nominalGrid = document.getElementById("nominalGrid");
const totalPrice = document.getElementById("totalPrice");
const form = document.getElementById("topupForm");
const toast = document.getElementById("toast");
const kodePromoInput = document.getElementById("promoCode"); 
const tombolPromo = document.getElementById("tombol-promo");
let batasPromo = 1;

let currentGame = "Mobile Legends";
let currentPrice = 15000;

function rupiah(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

function renderNominals(game) {
  const data = gameData[game];
  selectedGame.textContent = game;
  nominalLabel.textContent = `Pilih Nominal ${data.currency}`;
  nominalGrid.innerHTML = "";

  data.nominal.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `nominal ${index === 0 ? "selected" : ""}`;
    button.innerHTML = `<strong>${item[0]}</strong><span>${rupiah(item[1])}</span>`;

    button.addEventListener("click", () => {
      document.querySelectorAll(".nominal").forEach(el => el.classList.remove("selected"));
      button.classList.add("selected");
      currentPrice = item[1];
      totalPrice.textContent = rupiah(currentPrice);
    });

    nominalGrid.appendChild(button);
  });

  currentPrice = data.nominal[0][1];
  totalPrice.textContent = rupiah(currentPrice);
}

gameCards.forEach(card => {
  card.addEventListener("click", () => {
    gameCards.forEach(c => c.classList.remove("active"));
    card.classList.add("active");
    currentGame = card.dataset.game;
    renderNominals(currentGame);
    document.getElementById("topup").scrollIntoView({ behavior: "smooth" });
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const playerId = document.getElementById("playerId").value.trim();
  if (!playerId) {
    showToast("Masukkan ID pemain terlebih dahulu.");
    return;
  } else
    window.location.href = `login.html`;
});

document.getElementById("copyCoupon").addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText("HARDCORE10");
    showToast("Kode HARDCORE10 berhasil disalin!");
  } catch {
    showToast("Kode promo: HARDCORE10");
  }
});

tombolPromo.addEventListener("click", kodePromo);

function kodePromo () {
    const kode = kodePromoInput.value.trim();
    if (kode === "HARDCORE10" && batasPromo > 0) {
        const totalBayar = parseInt(totalPrice.textContent.replace(/[^0-9]/g, ''), 10);
        const diskon = totalBayar * 0.1;
        const totalSetelahDiskon = totalBayar - diskon;
        totalPrice.textContent = `Rp${totalSetelahDiskon.toLocaleString('id-ID')}`;
        batasPromo--;
        showToast(`Kode promo berhasil! Diskon 10% diterapkan.`);
    } else {
        showToast("Kode promo sudah terpakai atau tidak valid!");
    }
}

const testimoniSlider = document.getElementById("testimoniSlider");
const prevTestimoni = document.getElementById("prevTestimoni");
const nextTestimoni = document.getElementById("nextTestimoni");
const sliderControls = document.getElementById("sliderControl");

if (testimoniSlider && prevTestimoni && nextTestimoni) {
  const cards = Array.from(testimoniSlider.querySelectorAll(".testimoni-card"));
  let currentTestimoniIndex = 0;

  function getMaxIndex() {
    return cards.length - 1;
  }

  function updateTestimoniSlide() {
    const maxIndex = getMaxIndex();

    // Batasi index agar tetap valid
    currentTestimoniIndex = Math.min(Math.max(0, currentTestimoniIndex), maxIndex);

    // Geser slider sebesar 100% dari lebar container per kartu
    const offset = currentTestimoniIndex * 100;
    testimoniSlider.style.transform = `translate3d(-${offset}%, 0, 0)`;

    // Update status dot aktif
    if (sliderControls) {
      const dots = sliderControls.querySelectorAll(".dot");
      dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentTestimoniIndex);
      });
    }

    // Atur kondisi tombol prev / next
    prevTestimoni.disabled = currentTestimoniIndex === 0;
    nextTestimoni.disabled = currentTestimoniIndex === maxIndex;
  }

  nextTestimoni.addEventListener("click", () => {
    if (currentTestimoniIndex < getMaxIndex()) {
      currentTestimoniIndex++;
      updateTestimoniSlide();
    }
  });

  prevTestimoni.addEventListener("click", () => {
    if (currentTestimoniIndex > 0) {
      currentTestimoniIndex--;
      updateTestimoniSlide();
    }
  });

  if (sliderControls) {
    sliderControls.querySelectorAll(".dot").forEach(dot => {
      dot.addEventListener("click", () => {
        const targetIndex = Number(dot.dataset.index);
        currentTestimoniIndex = targetIndex;
        updateTestimoniSlide();
      });
    });
  }

  // Fitur Swipe Sentuh / Gesture HP
  let touchStartX = 0;

  testimoniSlider.addEventListener("touchstart", event => {
    touchStartX = event.changedTouches[0].clientX;
  }, { passive: true });

  testimoniSlider.addEventListener("touchend", event => {
    const touchEndX = event.changedTouches[0].clientX;
    const distance = touchStartX - touchEndX;

    if (Math.abs(distance) > 40) { // Toleransi geser 40px
      if (distance > 0 && currentTestimoniIndex < getMaxIndex()) {
        currentTestimoniIndex++;
      } else if (distance < 0 && currentTestimoniIndex > 0) {
        currentTestimoniIndex--;
      }
      updateTestimoniSlide();
    }
  }, { passive: true });

  window.addEventListener("resize", updateTestimoniSlide);
  updateTestimoniSlide();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

navMenu.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => navMenu.classList.remove("open"));
});

renderNominals(currentGame);