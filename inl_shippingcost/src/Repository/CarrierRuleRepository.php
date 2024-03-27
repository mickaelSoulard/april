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

namespace Module\Inl_shippingcost\Repository;

use Doctrine\ORM\EntityRepository;
use Doctrine\ORM\QueryBuilder;

class CarrierRuleRepository extends EntityRepository
{
    /**
     * @param int $carrierId
     *
     * @return object|null
     */
    public function findOneById(int $carrierId)
    {
        return $this->findOneBy(['id' => $carrierId]);
    }
	/**
     * @param int $carrierRef
     *
     * @return object|null
     */
	public function findByCarrierId(int $carrierRef)
    {
        return $this->findBy(['carrierId' => $carrierRef]);
    }
}

