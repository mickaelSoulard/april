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

namespace Module\Inl_shippingcost\Install;

use Configuration;
use Country;
use DateTime;
use Db;
use Order;

/**
 * Installs data fixtures for the module.
 */
class FixturesInstaller
{
    /**
     * @var Db
     */
    private $db;

    public function __construct(Db $db)
    {
        $this->db = $db;
    }

    public function install(): void
    {
        // $orderIds = Order::getOrdersIdByDate('2000-01-01', '2100-01-01');

        // foreach ($orderIds as $orderId) {
            // $order = new Order($orderId);
            // $this->insertPickup($orderId);
        // }
    }

    // private function insertPickup(int $orderId): void
    // {
        // $this->db->insert('order_pickup', [
            // 'id_order' => $orderId,
			// 'id_store' => 0,
			// 'date' => null,
			// 'hour' => null,
        // ]);
    // }
}
