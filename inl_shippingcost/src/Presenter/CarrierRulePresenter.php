<?php
/**
 * 2007-2020 PrestaShop
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License 3.0 (AFL-3.0).
 * It is also available through the world-wide-web at this URL: https://opensource.org/licenses/AFL-3.0
 */

declare(strict_types=1);

namespace Module\Inl_shippingcost\Presenter;

use Carrier;
use Country;
use Module\Inl_shippingcost\Entity\CarrierRule;

class CarrierRulePresenter
{
    /**
     * @var string
     */

    public function __construct()
    {
    }

    public function present(CarrierRule $carrierRule, int $languageId): array
    {
        $carrier = new Carrier($carrierRule->getCarrierId());

        return [
            'id_carrier' => $carrierRule->getCarrierId(),
            'id_reference' => $carrierRule->getIdReference(),
			'id_country' => $carrierRule->getIdCountry(),
			'price' => $carrierRule->getPrice(),
			'price_max' => $carrierRule->getPriceMax(),
        ];
    }
}
