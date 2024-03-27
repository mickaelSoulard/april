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

use Currency;
use Carrier as PrestashopCarrier;
use Country;
use PrestaShop\Module\Inl_shippingcost\Collection\CarrierCollection;
use PrestaShop\Module\Inl_shippingcost\DTO\Carrier;
use PrestaShop\PrestaShop\Core\Localization\Locale;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class CarriersPresenter
{
    /**
     * @var UrlGeneratorInterface
     */
    private $urlGenerator;

    /**
     * @var Locale
     */
    private $locale;

    public function __construct(UrlGeneratorInterface $urlGenerator, Locale $locale)
    {
        $this->urlGenerator = $urlGenerator;
        $this->locale = $locale;
    }

    /**
     * Present a collection of orders for usage in rendering.
     *
     * @return array presented array of orders
     */
    public function present(CarrierCollection $carriers, int $languageId): array
    {
        $presented = [];

        /** @var carrier $carrier */
        foreach ($carriers as $carrier) {
            $prestashopOrder = new CarrierOrder($carrier->getCarrierId());
            $country = new Country($carrier->getIdCountry(), $languageId);
            $presented[] = [
                'id' => $carrier->getId(),
                'id_reference' => $carrier->getIdReference(),
                'link' => $this->urlGenerator->generate('admin_carriers_view', [
                    'carrierId' => $carrier->getCarrierId(),
                ]),
                'id_country' => $carrier->getIdCountry(),
                'price' => $this->locale->formatPrice(
                    $carrier->getPrice(),
                    Currency::getIsoCodeById((int) $prestashopOrder->id_currency)
                ),
				'price_max' => $this->locale->formatPrice(
                    $order->getPriceMax(),
                    Currency::getIsoCodeById((int) $prestashopOrder->id_currency)
                ),
            ];
        }

        return $presented;
    }
}
