namespace offlineMeeting.Models.Entity.Share
{
    public class AlcoholDataEntity
    {
        public long? ResultId {  get; set; } // 結果ID
        public string? Image {  get; set; } // 画像URL
        public string? LowImage { get; set; }
        public int Width { get; set; }
        public int Height { get; set; }
        public string? AlcoholName { get; set; } // 酒名
        public string? Abbreviation { get; set; } // 略称
        public string? Brewery { get; set; } // 醸造所
        public string? Prefectures { get; set; } // 都道府県
        public string? GenryoMai { get; set; } // 原料米
        public string? SpeciallyDesignated { get; set; } // 特定名称
        public int? RicePolishingRatio { get; set; } // 精米歩合
        public decimal? SakeMeterValue { get; set; } // 日本酒度
        public decimal? AcidRate { get; set; } // 酸度
        public decimal? Abv { get; set; } // アルコール度数
        public int? Rarity { get; set; } // レアリティ
        public int? CoinNumber { get; set; } // コイン必要数
        public int? LeftAmount { get; set; } // 残り数量
        public bool Priority { get; set; } // 優先
        public bool Hide { get; set; } // 隠す
        public bool Ordered { get; set; } = false; // 注文済み
        public string? Taseting { get; set; } // 合う料理
        public string? RarityReason { get; set; } // レアリティの理由
        public string? Explanation { get; set; } // 説明
        public string? MainLabel { get; set; } // メインラベル
        public string? BreweryFeatures { get; set; } // 醸造所の特徴
        public int PostCode { get; set; } // 郵便番号
        public string? Municipality { get; set; } // 市町村
        public string? Address { get; set; } // 住所
        public int Tel { get; set; } // 電話番号
        public string? Url { get; set; } // URL
        public AlcoholDataEntity(
            long? resultId,
            string? image,
            string? lowImage,
            int width,
            int height,
            string? alcoholName,
            string? abreviation,
            string? brewery,
            string? prefectures,
            string? genryoMai,
            string? speciallyDesignated,
            int? ricePolishingRatio,
            decimal? sakeMeterValue,
            decimal? acidRate,
            decimal? abv,
            int? rarity,
            int? coinNumber,
            int? leftAmount,
            bool priority,
            bool hide,
            bool ordered,
            string? taseting,
            string? rarityReason = null,
            string? explanation = null,
            string? mainLabel = null,
            string? breweryFeatures = null,
            int postCode = 0,
            string? municipality = null,
            string? address = null,
            int tel = 0,
            string? url = null
        )
        {
            ResultId = resultId;
            Image = image;
            LowImage = lowImage;
            Width = width;
            Height = height;
            AlcoholName = alcoholName;
            Abbreviation = abreviation;
            Brewery = brewery;
            Prefectures = prefectures;
            GenryoMai = genryoMai;
            SpeciallyDesignated = speciallyDesignated;
            RicePolishingRatio = ricePolishingRatio;
            SakeMeterValue = sakeMeterValue;
            AcidRate = acidRate;
            Abv = abv;
            Rarity = rarity;
            CoinNumber = coinNumber;
            LeftAmount = leftAmount;
            Priority = priority;
            Hide = hide;
            Ordered = ordered;
            Taseting = taseting;
            RarityReason = rarityReason;
            Explanation = explanation;
            MainLabel = mainLabel;
            BreweryFeatures = breweryFeatures;
            PostCode = postCode;
            Municipality = municipality;
            Address = address;
            Tel = tel;
            Url = url;
        }
    }
}