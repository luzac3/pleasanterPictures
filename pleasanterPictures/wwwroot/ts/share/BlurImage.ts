export class BlurImage {
    public static initBlurUp(container: ParentNode = document): void {
        container.querySelectorAll('img.blur-up').forEach(_img => {
            const img = _img as HTMLImageElement;
            const hdSrc = img.dataset.src;
            if (!hdSrc || img.classList.contains('loaded')) return;

            const onHDLoad = () => {
                img.classList.add('loaded');
                img.removeEventListener('load', onHDLoad);
            };

            const loadHDImage = () => {
                img.addEventListener('load', onHDLoad);
                img.src = hdSrc;
            };

            if (img.loading === 'lazy' && 'IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            loadHDImage();
                            obs.unobserve(img);
                        }
                    });
                });
                observer.observe(img);
            } else {
                loadHDImage();
            }
        });
    }

    public static loaded(): void {
        document.addEventListener('DOMContentLoaded', () => {
            BlurImage.initBlurUp(document);
        });
    }
}