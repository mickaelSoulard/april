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

namespace Module\Inl_shippingcost\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass="Module\Inl_shippingcost\Repository\CarrierRuleRepository")
 */
class CarrierRule
{
    /**
     * @var int|null
     *
     * @ORM\Id
     * @ORM\Column(name="id_rule", type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var int
     *
     * @ORM\Column(name="id_carrier", type="integer")
     */
    private $carrierId;

    /**
     * @var int
     *
     * @ORM\Column(name="id_reference", type="integer")
     */
    private $id_reference;
	
	/**
     * @var string
     *
     * @ORM\Column(name="id_country", type="integer")
     */
    private $id_country;
	
	/**
     * @var float
     *
     * @ORM\Column(name="price", type="float")
     */
    private $price;
	/**
     * @var float
     *
     * @ORM\Column(name="price_max", type="float")
     */
	private $price_max;

    /**
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @param int $id
     *
     * @return self
     */
    public function setId(int $id): self
    {
        $this->id = $id;

        return $this;
    }
	
	 /**
     * @return int
     */
    public function getCarrierId(): int
    {
        return $this->carrierId;
    }

    /**
     * @param integer $id_store
     *
     * @return int
     */
    public function setCarrierId(int $carrierId): self
    {
        $this->carrierId = $carrierId;

        return $this;
    }
	
	 /**
     * @return string
     */
    public function getIdReference(): int
    {
        return $this->id_reference;
    }

    /**
     * @param string $date
     *
     * @return self
     */
    public function setIdReference(int $id_reference): self
    {
        $this->id_reference = $id_reference;

        return $this;
    }
	
	 /**
     * @return string
     */
    public function getIdCountry(): int
    {
        return $this->id_country;
    }

    /**
     * @param string $date
     *
     * @return self
     */
    public function setIdCountry(int $id_country): self
    {
        $this->id_country = $id_country;

        return $this;
    }

    /**
     * @return int
     */
    public function getPrice(): float
    {
        return $this->price;
    }

    /**
     * @param int $orderId
     *
     * @return self
     */
    public function setPrice(float $price): self
    {
        $this->price = $price;

        return $this;
    }
	
	/**
     * @return int
     */
    public function getPriceMax(): float
    {
        return $this->price_max;
    }

    /**
     * @param int $orderId
     *
     * @return self
     */
    public function setPriceMax(float $price_max): self
    {
        $this->price_max = $price_max;

        return $this;
    }
}
