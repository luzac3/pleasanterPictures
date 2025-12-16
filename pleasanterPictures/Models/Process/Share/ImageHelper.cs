using Microsoft.AspNetCore.WebUtilities;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Webp;
using SixLabors.ImageSharp.Processing;

namespace offlineMeeting.Models.Process.Share
{
    public class ImageHelper : IDisposable
    {
        byte[] ImageBytes;
        Image ImageObject;
        private bool disposed = false;

        public ImageHelper(byte[] imageBytes)
        {
            ImageBytes = imageBytes;
            ImageObject = Image.Load(ImageBytes);
        }

        public string GetLowQualityBase64()
        {
            using var ms = ConvertToMemoryStream();
            return Convert.ToBase64String(ms.ToArray());
        }

        public byte[] GetLowQualityBytes()
        {
            using var ms = ConvertToMemoryStream();
            return ms.ToArray();
        }

        public (int width, int height) GetSize()
        {
            return (ImageObject.Width, ImageObject.Height);
        }   

        private MemoryStream ConvertToMemoryStream()
        {
            Image image = ImageObject;
            image.Mutate(x => x.Resize(new ResizeOptions
            {
                Size = new Size(100, 0),
                Mode = ResizeMode.Max
            }));

            WebpEncoder encoder = new WebpEncoder { FileFormat = WebpFileFormatType.Lossy, Quality = 10 };
            MemoryStream ms = new MemoryStream();
            image.Save(ms, encoder);
            ms.Position = 0;
            return ms;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    // マネージドリソースの解放
                    ImageObject?.Dispose();
                }
                // アンマネージドリソースの解放（必要ならここに記述）
                disposed = true;
            }
        }

        ~ImageHelper()
        {
            Dispose(false);
        }
    }
}
