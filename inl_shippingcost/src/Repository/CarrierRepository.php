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

use DateTimeImmutable;
use Db;
use DbQuery;
use Carrier as PrestaShopCarrier;
use PrestaShop\Module\Inl_shippingcost\Collection\CarrierCollection;
use PrestaShop\Module\Inl_shippingcost\DTO\Carrier;

/**
 * This repository uses DbCore from PrestaShop for Database Abstraction Layer
 * It does not extend Doctrine EntityRepository
 */
class CarrierRepository
{
    /**
     * @var Db
     */
    private $db;

    public function __construct()
    {
        $this->db = Db::getInstance();
    }

    /**
     * Get all orders that a customer has placed.
     */
    // public function getCustomerOrders(int $carrierId, array $excludeCarrierIds = []): CarrierCollection
    // {
        // $orders = PrestaShopCarrier::getCustomerOrders($carrierId);
        // $carriersCollection = new CarrierCollection();

        // foreach ($carriersCollection as $carrier) {
            // if (in_array($carrier['id_carrier'], $excludeCarrierIds)) {
                // continue;
            // }

            // $carriersCollection->add(new Carrier(
                // (int) $carrier['id_order'],
                // $carrier['id_reference']
            // ));
        // }

        // return $ordersCollection;
    // }

    // public function getNextOrderId(int $orderId): ?int
    // {
        // $query = new DbQuery();
        // $query
            // ->select('id_order')
            // ->from('orders')
            // ->where('id_order > '.$orderId)
            // ->orderBy('id_order ASC')
        // ;

        // $result = $this->db->getValue($query);

        // return $result ? (int) $result : null;
    // }

    // public function getPreviousOrderId(int $orderId): ?int
    // {
        // $query = new DbQuery();
        // $query
            // ->select('id_order')
            // ->from('orders')
            // ->where('id_order < '.$orderId)
            // ->orderBy('id_order DESC')
        // ;

        // $result = $this->db->getValue($query);

        // return $result ? (int) $result : null;
    // }
}
