<?php
declare(strict_types=1);

namespace Module\Inl_shippingcost\Form;

use PrestaShop\PrestaShop\Core\Configuration\DataConfigurationInterface;
use PrestaShop\PrestaShop\Core\Form\FormDataProviderInterface;
use Module\Inl_shippingcost\Entity\CarrierRule;
use Symfony\Component\HttpFoundation\Request;
use Doctrine\ORM\EntityManagerInterface;
use Module\Inl_shippingcost\Presenter\CarriersPresenter;
use Module\Inl_shippingcost\Presenter\CarrierRulePresenter;
use Module\Inl_shippingcost\Repository\CarrierRepository;
use Module\Inl_shippingcost\Repository\CarrierRuleRepository;

class CarrierRuleTextFormDataProvider implements FormDataProviderInterface
{
    private $carrierRuletTextDataConfiguration;
	private $entityManager;

    public function __construct(DataConfigurationInterface $carrierRuletTextDataConfiguration, 
								EntityManagerInterface $entityManager
	)
    {
        $this->carrierRuletTextDataConfiguration = $carrierRuletTextDataConfiguration;
		$this->entityManager = $entityManager;
    }

    public function getData()
    {
		// $carrierRuleRepository = $this->get('prestashop.module.inl_shippingcost.repository.carrier_rule_repository');

        // $carrierRulePresenter = new CarrierRulePresenter();

        // $carrierRule = $carrierRuleRepository->findOneByRuleId(2);

        // if (!$carrierRule) {
            // return '';
        // }
		
		// $return = [];
		// $return['country'] = 8;
		// return $return;
        // return $this->carrierRuletTextDataConfiguration->getConfiguration();
    }
	
	public function updateData($id, array $data)
    {
		// $carrierRuleRepository = $this->get('prestashop.module.inl_shippingcost.repository.carrier_rule_repository');

        // $carrierRulePresenter = new CarrierRulePresenter();

        // $carrierRule = $carrierRuleRepository->findOneByRuleId($id);
		// var_dump($carrierRule);
		// die();
		// // $CarrierRule = new CarrierRule();
		// $CarrierRule
				// ->setCarrierId((int)$data["carriers"])
				// ->setIdReference((int)$data["carriers"])
				// ->setIdCountry((int)$data["country"])
				// ->setPrice($data["price_max"])
			// ;
			
			// //This call adds the entity to the EntityManager scope (now it knows the entity exists)
			// $this->entityManager->persist($CarrierRule);

			// //This call validates all previous modification (modified/persisted entities)
			// //This is when the database queries are performed
			// $this->entityManager->flush();
			
		return [];
    }

    public function setData(array $data): array
    {
		// $entityManager  = $this->get('doctrine.orm.entity_manager');
		$CarrierRule = new CarrierRule();
		$CarrierRule
				->setCarrierId((int)$data["carriers"])
				->setIdReference((int)$data["carriers"])
				->setIdCountry((int)$data["country"])
				->setPrice($data["price_min"])
				->setPriceMax($data["price_max"])
			;
			
			//This call adds the entity to the EntityManager scope (now it knows the entity exists)
			$this->entityManager->persist($CarrierRule);

			//This call validates all previous modification (modified/persisted entities)
			//This is when the database queries are performed
			$this->entityManager->flush();
			
		return [];
			
        // return $this->carrierRuletTextDataConfiguration->updateConfiguration($data);
    }
}