package pl.pussy.campaignapp.services;

import org.springframework.stereotype.Service;
import pl.pussy.campaignapp.models.Campaign;
import pl.pussy.campaignapp.repositories.CampaignRepository;

import javax.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CampaignService {

    private final CampaignRepository campaignRepository;

    public CampaignService(CampaignRepository campaignRepository) {
        this.campaignRepository = campaignRepository;
    }

    public List<Campaign> getAll() {
        return campaignRepository.findAll();
    }

    public Campaign addCampaign(Campaign campaign) {
        return campaignRepository.save(campaign);
    }

    public Campaign getById(Long id) {
        return campaignRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("Campaign with id: " + id + " not found"));
    }

    public void deleteCampaign(Long id) {
        campaignRepository.deleteById(id);
    }
}
