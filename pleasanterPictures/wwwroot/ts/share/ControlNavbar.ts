export class ControlNavbar {
    constructor() {
        this.setPadding();
        window.addEventListener('resize', this.setPadding);
    }

    setPadding = () => {
        const navbar = document.querySelector('.navbar') as HTMLElement;
        let subbarHeight = 0;
        if (navbar) {
            document.body.classList.remove('nodisplay'); 
            const subbar = document.querySelector('.navbar-sub') as HTMLElement;
            if (subbar) {
                subbarHeight = navbar.offsetHeight;
                subbar.style.top = subbarHeight + 'px';
            }
            document.body.style.paddingTop = (navbar.offsetHeight + subbarHeight + 5) + 'px';
        }
    }
}