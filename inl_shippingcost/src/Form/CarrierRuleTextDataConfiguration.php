<?php
namespace Module\Inl_shippingcost\Form;

use PrestaShop\PrestaShop\Core\Configuration\DataConfigurationInterface;
use PrestaShop\PrestaShop\Core\ConfigurationInterface;
// use PrestaShop\Module\Inl_shippingcost\Entity\CarrierRule;
// use Doctrine\ORM\EntityManagerInterface;

final class CarrierRuleTextDataConfiguration implements DataConfigurationInterface
{    
    public const TRANSLATABLE_TEXT_AREA = 'INL_SHIPPINGCOST_TRANSLATABLE_TEXT_AREA_TYPE';
    public const FORMATTED_TEXT_AREA_TYPE = 'INL_SHIPPINGCOST_FORMATTED_TEXT_AREA_TYPE';
    private $configuration;
    public function __construct(ConfigurationInterface $configuration)
    {
        $this->configuration = $configuration;
    }
    public function getConfiguration(): array
    {
        $return = [];
        if ($translatableTextArea = $this->configuration->get(static::TRANSLATABLE_TEXT_AREA)) {
            $return['translatable_text_area_type'] = $translatableTextArea;
        }
        if ($formattedTextAreaType = $this->configuration->get(static::FORMATTED_TEXT_AREA_TYPE)) {
            $return['formatted_text_area_type'] = $formattedTextAreaType;
        }
        return $return;
    }
    public function updateConfiguration(array $configuration): array
    {
			// $entityManager  = $this->getDoctrine()->getManager();
			// $CarrierRule = new CarrierRule();
			// var_dump($configuration);
			// die();
			// $CarrierRule
				// ->setCarrierId($order->id)
				// ->setIdStore($cookieStore)
				// ->setHour($cookieHours)
				// ->setDate($cookieDate)
			// ;
			//This call adds the entity to the EntityManager scope (now it knows the entity exists)
			// $entityManager->persist($orderPickup);

			//This call validates all previous modification (modified/persisted entities)
			//This is when the database queries are performed
			// $entityManager->flush();
			
		
        $this->configuration->set(
            static::TRANSLATABLE_TEXT_AREA, 
            $configuration['translatable_text_area_type']
        );        
        $this->configuration->set(
            static::FORMATTED_TEXT_AREA_TYPE, $configuration['formatted_text_area_type'], 
            null,
            ['html' => true]
        );        
        return [];
    }    
    public function validateConfiguration(array $configuration): bool
    {
        return true;
    }
}