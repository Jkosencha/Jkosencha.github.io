// Dashboard gallery: one screen at a time, tabs + light/dark switch.
// Images are named <data-prefix><screen>-<mode>.webp (or <screen>.webp with data-single), and the phone view <data-prefix>mobile-<mode>.webp.
document.querySelectorAll(".dash-gallery").forEach(gallery => {
    const prefix = gallery.dataset.prefix;
    const tabs = gallery.querySelectorAll(".dash-tabs button");
    const modes = gallery.querySelectorAll(".dash-mode button");
    const view = gallery.querySelector(".dash-view");
    const img = gallery.querySelector(".dash-img");
    const phone = gallery.querySelector(".phone-img");
    const caption = gallery.querySelector(".dash-caption");
    let tab = tabs[0], mode = "light";

    function render() {
        // data-single: a screen with one theme only (e.g. the sign-in page)
        const single = "single" in tab.dataset;
        img.src = single ? `${prefix}${tab.dataset.screen}.webp` : `${prefix}${tab.dataset.screen}-${mode}.webp`;
        img.alt = single ? tab.dataset.alt : `${tab.dataset.alt}, ${mode} mode`;
        if (phone) phone.src = `${prefix}mobile-${mode}.webp`;
        view.classList.toggle("with-phone", phone !== null && "phone" in tab.dataset);
        caption.innerHTML = `<strong>${tab.textContent}:</strong> ${tab.dataset.caption}`;
        tabs.forEach(b => b.setAttribute("aria-selected", b === tab));
        modes.forEach(b => b.setAttribute("aria-pressed", b.dataset.mode === mode));
    }
    tabs.forEach(b => b.addEventListener("click", () => { tab = b; render(); }));
    modes.forEach(b => b.addEventListener("click", () => { mode = b.dataset.mode; render(); }));
    render();
});
