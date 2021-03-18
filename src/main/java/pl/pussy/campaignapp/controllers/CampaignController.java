package pl.pussy.campaignapp.controllers;

import org.springframework.web.bind.annotation.*;
import pl.pussy.campaignapp.services.CampaignService;
import pl.pussy.campaignapp.models.Campaign;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
@CrossOrigin
public class CampaignController {

    private final CampaignService campaignService;

    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @GetMapping
    public List<Campaign> getall() {
        return campaignService.getAll();
    }

    @GetMapping("/{id}")
    public Campaign getById(@PathVariable Long id) {
        return campaignService.getById(id);
    }

    @PostMapping
    public Campaign addCampaign(@RequestBody @Valid Campaign campaign) {
        return campaignService.addCampaign(campaign);
    }
    @PutMapping("/{id}")
    public Campaign updateCampaign(@PathVariable Long id, @RequestBody Campaign campaign) {
        campaign.setId(id);
        return campaignService.addCampaign(campaign);
    }

    @DeleteMapping("/{id}")
    public void deleteCampaign(@PathVariable Long id) {
        campaignService.deleteCampaign(id);
    }
}
