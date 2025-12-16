using offlineMeeting.Models.Entity.Picture;
namespace offlineMeeting.Models.ViewModel
{
    public class PictureViewModel
    {
        public List<PictureEntity>? PictureEntityList { get; set; }
        public PictureEntity? PictureEntity { get; set; }
        public List<AnswerEntity>? AnswerEntityList { get; set; }
        public AnswerEntity? AnswerEntity { get; set; }

        public PictureViewModel() { }
        public void setPictureEntityList(List<PictureEntity> pictureEntityList)
        {
            PictureEntityList = pictureEntityList;
        }
        public void setPictureEntity(PictureEntity? pictureEntity)
        {
            PictureEntity = pictureEntity;
        }
        public void setAnswerEntityList(List<AnswerEntity> answerEntity)
        {
            AnswerEntityList = answerEntity;
        }
        public void setAnswerEntity(AnswerEntity answerEntity)
        {
            AnswerEntity = answerEntity;
        }
    }
}