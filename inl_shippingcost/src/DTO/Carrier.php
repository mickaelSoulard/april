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

namespace Module\Inl_shippincost\DTO;

// use DateTimeImmutable;

final class Carrier
{
    /**
     * @var int
     */
    private $carrierId;

    /**
     * @var string
     */
    private $referenceId;

    /**
     * @var int
     */
    private $countryId;

    /**
     * @var DateTimeImmutable
     */
    private $price;
	
	private $price_max;

    public function __construct(int $carrierId, string $referenceId, int $countryId, floatval $price)
    {
        $this->carrierId = $carrierId;
        $this->referenceId = $referenceId;
        $this->countryId = $countryId;
        $this->price = $price;
		$this->price = $price_max;
    }

    public function getCarrierId(): int
    {
        return $this->carrierId;
    }

    public function getReferenceId(): string
    {
        return $this->referenceId;
    }

    public function getCountryId(): int
    {
        return $this->countryId;
    }

    public function getPrice(): floatval
    {
        return $this->price;
    }
	public function getPriceMax(): floatval
    {
        return $this->price_max;
    }
}
