package pl.pussy.campaignapp.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import pl.pussy.campaignapp.models.Campaign;

public interface CampaignRepository extends JpaRepository<Campaign, Long> {
}
