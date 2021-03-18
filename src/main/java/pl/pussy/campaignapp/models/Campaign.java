package pl.pussy.campaignapp.models;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Getter
@Setter
public class Campaign {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    @NotBlank(message = "name can't be null")
    private String name;
    @ElementCollection
    @NotEmpty(message = "keywords list can't be empty")
    private List<String> keywords;
    @NotNull(message = "bid amount can't be null")
    @Min(value = 10)
    private BigDecimal bidAmount;
    @Min(value = 1)
    @NotNull(message = "campaign fund can't be null")
    private BigDecimal campaignFund;
    @NotNull(message = "status can't be null")
    private CampaignStatus campaignStatus;
    private String town;
    @NotNull(message = "radius can't be empty")
    @Min(value = 1)
    private int radius;
}
