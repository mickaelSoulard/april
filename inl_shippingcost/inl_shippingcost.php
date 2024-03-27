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

use Module\Inl_shippingcost\Collection\CarrierCollection;
use Module\Inl_shippingcost\Install\InstallerFactory;
use Module\Inl_shippingcost\Presenter\CarriersPresenter;
use Module\Inl_shippingcost\Presenter\CarrierRulePresenter;
use Module\Inl_shippingcost\Repository\CarrierRepository;
use Module\Inl_shippingcost\Repository\CarrierRuleRepository;

if (!defined('_PS_VERSION_')) {
    exit;
}

// need it because InstallerFactory is not autoloaded during the install
require_once __DIR__.'/vendor/autoload.php';

class Inl_shippingcost extends Module
{
    public function __construct()
    {
        $this->name = 'inl_shippingcost';
        $this->author = 'INNLOG';
        $this->version = '1.0.0';
        $this->ps_versions_compliancy = ['min' => '1.7.7.0', 'max' => _PS_VERSION_];

        parent::__construct();

        $this->displayName = $this->l('inl_shippingcost');
        $this->description = $this->l('add rules shipping cost');
		$tabNames = [];
        foreach (Language::getLanguages(true) as $lang) {
            $tabNames[$lang['locale']] = $this->trans('Règles carrières', [], 'Modules.Innlog_shippingcost.Admin', $lang['locale']);
        }
        $this->tabs = [
            [
                'route_name' => 'inl_shippingcost_index',
                'class_name' => 'AdminInnlogGrid',
                'visible' => true,
                'name' => $tabNames,
                'icon' => 'school',
                'parent_class_name' => 'IMPROVE',
            ],
        ];
    }

    public function install()
    {
        if (!parent::install()) {
            return false;
        }
        $installer = InstallerFactory::create();
        return $installer->install($this);
    }

    public function uninstall()
    {
        return parent::uninstall();
    }

    /**
     * Add buttons to main buttons bar
     */
    // public function hookActionGetAdminOrderButtons(array $params)
    // {
        // $order = new Order($params['id_order']);

        // /** @var \Symfony\Bundle\FrameworkBundle\Routing\Router $router */
        // $router = $this->get('router');

        // /** @var \PrestaShopBundle\Controller\Admin\Sell\Order\ActionsBarButtonsCollection $bar */
        // $bar = $params['actions_bar_buttons_collection'];

        // $viewCustomerUrl = $router->generate('admin_customers_view', ['customerId'=> (int)$order->id_customer]);
        // $bar->add(
            // new \PrestaShopBundle\Controller\Admin\Sell\Order\ActionsBarButton(
                // 'btn-secondary', ['href' => $viewCustomerUrl], 'View customer'
            // )
        // );
        // $bar->add(
            // new \PrestaShopBundle\Controller\Admin\Sell\Order\ActionsBarButton(
                // 'btn-info', ['href' => 'https://www.prestashop.com/'], 'Go to prestashop'
            // )
        // );
        // $bar->add(
            // new \PrestaShopBundle\Controller\Admin\Sell\Order\ActionsBarButton(
                // 'btn-dark', ['href' => 'https://github.com/PrestaShop/example-modules/tree/master/demovieworderhooks'], 'Go to GitHub'
            // )
        // );
        // $createAnOrderUrl = $router->generate('admin_orders_create');
        // $bar->add(
            // new \PrestaShopBundle\Controller\Admin\Sell\Order\ActionsBarButton(
                // 'btn-link', ['href' => $createAnOrderUrl], 'Create an order'
            // )
        // );
    // }

    /**
     * Displays customer's signature.
     */
    // public function hookDisplayAdminOrderSide(array $params)
    // {
        // /** @var OrderSignatureRepository $signatureRepository */
        // $pickupRepository = $this->get('prestashop.module.b2w_customorder.repository.order_pickup_repository');

        // /** @var OrderSignaturePresenter $signaturePresenter */
        // $pickupPresenter = $this->get('prestashop.module.b2w_customorder.presenter.order_pickup_presenter');

        // $pickup = $pickupRepository->findOneByOrderId($params['id_order']);

        // if (!$pickup) {
            // return '';
        // }

        // return $this->render($this->getModuleTemplatePath() . 'customer_pickup.html.twig', [
            // 'pickup' => $pickupPresenter->present($pickup, (int) $this->context->language->id),
        // ]);
    // }

    /**
     * Display shipment tracking information.
     */
    // public function hookDisplayAdminOrderTabContent(array $params)
    // {
        // /** @var PackageLocationRepository $locationRepository */
        // $locationRepository = $this->get('prestashop.module.demovieworderhooks.repository.package_location_repository');

        // $locations = $locationRepository->findBy(
            // ['orderId' => $params['id_order']],
            // ['position' => 'asc']
        // );

        // /** @var PackageLocationsPresenter $locationsPresenter */
        // $locationsPresenter = $this->get('prestashop.module.demovieworderhooks.presenter.package_locations_presenter');

        // return $this->render($this->getModuleTemplatePath() . 'tracking.html.twig', [
            // 'packageLocations' => $locationsPresenter->present($locations),
        // ]);
    // }

    /**
     * Display tracking tab link.
     */
    // public function hookDisplayAdminOrderTabLink(array $params)
    // {
        // return $this->render($this->getModuleTemplatePath() . 'tracking_link.html.twig');
    // }

    // public function hookDisplayAdminOrderMain(array $params)
    // {
        // /** @var OrderRepository $orderRepository */
        // $orderRepository = $this->get('prestashop.module.demovieworderhooks.repository.order_repository');
        // /** @var OrdersPresenter $ordersPresenter */
        // $ordersPresenter = $this->get('prestashop.module.demovieworderhooks.presenter.orders_presenter');

        // $order = new Order($params['id_order']);
        // /** @var OrderCollection $customerOrdersCollection */
        // $customerOrdersCollection = $orderRepository->getCustomerOrders((int)$order->id_customer, [$order->id]);
        // $onlyDeliveredOrders = $customerOrdersCollection->filter(
            // function (\PrestaShop\Module\DemoViewOrderHooks\DTO\Order $order) {
                // return $order->getOrderStateId() === self::DELIVERED_ORDER_STATE_ID;
            // }
        // );

        // return $this->render($this->getModuleTemplatePath() . 'customer_delivered_orders.html.twig', [
            // 'currentOrderId' => (int) $params['id_order'],
            // 'orders' => $ordersPresenter->present(
            // // Get all customer orders wit status 'Delivered' except currently viewed order
                // $onlyDeliveredOrders,
                // (int) $this->context->language->id
            // ),
        // ]);
    // }

    /**
     * Displays customer's review about the order.
     */
    // public function hookDisplayAdminOrderSideBottom(array $params)
    // {
        // /** @var OrderReviewRepository $orderReviewRepository */
        // $orderReviewRepository = $this->get('prestashop.module.demovieworderhooks.repository.order_review_repository');

        // /** @var OrderReviewPresenter $orderReviewPresenter */
        // $orderReviewPresenter = $this->get('prestashop.module.demovieworderhooks.presenter.order_review_presenter');

        // $orderReview = $orderReviewRepository->findOneBy(['orderId' => $params['id_order']]);

        // if (!$orderReview) {
            // return '';
        // }

        // return $this->render($this->getModuleTemplatePath() . 'customer_satisfaction.html.twig', [
            // 'orderReview' => $orderReviewPresenter->present($orderReview),
        // ]);
    // }

    /**
     * Displays other orders from the same customer in a block.
     */
    // public function hookDisplayAdminOrder(array $params)
    // {
        // /** @var OrderRepository $orderRepository */
        // $orderRepository = $this->get('prestashop.module.demovieworderhooks.repository.order_repository');

        // /** @var OrdersPresenter $ordersPresenter */
        // $ordersPresenter = $this->get('prestashop.module.demovieworderhooks.presenter.orders_presenter');

        // $order = new Order($params['id_order']);

        // return $this->render($this->getModuleTemplatePath() . 'customer_orders.html.twig', [
            // 'currentOrderId' => (int) $params['id_order'],
            // 'orders' => $ordersPresenter->present(
            // // Get all customer orders except currently viewed order
                // $orderRepository->getCustomerOrders((int) $order->id_customer, [$order->id]),
                // (int) $this->context->language->id
            // ),
        // ]);
    // }

    /**
     * Displays placeholder text in quick order preview.
     */
    // public function hookDisplayOrderPreview(array $params)
    // {
        // $orderId = $params['order_id']; // access to id of the order

        // return (new joshtronic\LoremIpsum())->sentence();
    // }

    /**
     * Displays previous/next order buttons.
     */
    // public function hookDisplayAdminOrderTop(array $params)
    // {
        // /** @var OrderRepository $orderRepository */
        // $orderRepository = $this->get('prestashop.module.demovieworderhooks.repository.order_repository');

        // /** @var OrderLinkPresenter $orderLinkPresenter */
        // $orderLinkPresenter = $this->get('prestashop.module.demovieworderhooks.presenter.order_link_presenter');

        // $nextOrderId = $orderRepository->getNextOrderId((int) $params['id_order']);
        // $previousOrderId = $orderRepository->getPreviousOrderId((int) $params['id_order']);

        // return $this->render($this->getModuleTemplatePath() . 'order_navigation.html.twig', [
            // 'previousOrder' => $orderLinkPresenter->present($previousOrderId),
            // 'nextOrder' => $orderLinkPresenter->present($nextOrderId),
        // ]);
    // }
	
	public function hookActionShippingCostInl($cart){
		// $test = $this->getContentShippingCost($cart['id_reference'], $cart['id_zone'], $cart['orderTotalwithDiscounts']);
		$carrierRuleRepository = $this->get('prestashop.module.inl_shippingcost.repository.carrier_rule_repository');
		$carrierRulePresenter = $this->get('prestashop.module.inl_shippingcost.presenter.carrier_rule_presenter');
		$carrierRule = $carrierRuleRepository->findByCarrierId((int)$cart['id_reference']);
		if($carrierRule){
			$id_lang = $this->get('prestashop.adapter.legacy.context')->getContext()->language->id;
			foreach($carrierRule as $carrier){
				$carrier = $carrierRulePresenter->present($carrier, (int)$id_lang);
				if((int)$carrier["id_country"] == $cart['id_zone'] 
					&& $carrier["price"] < floatval($cart['orderTotalwithDiscounts'])
					&& $carrier["price_max"] > floatval($cart['orderTotalwithDiscounts'])
				){
					return 'free';
				}
			}
		}
		return false;
	}
	
	// public function hookDisplayAdminOrderSide(array $params)
    // {
        // $carrierRuleRepository = $this->get('prestashop.module.inl_shippingcost.repository.carrier_rule_repository');
		// $carrierRulePresenter = $this->get('prestashop.module.inl_shippingcost.presenter.carrier_rule_presenter');

        // $carrierRule = $carrierRuleRepository->findOneById(11);
		// $carrier = $carrierRulePresenter->present($carrierRule, (int)Context::getContext()->language->id);
		// var_dump($carrier);
		// die();
    // }
	
	// public function getContentShippingCost($id_reference, $id_zone, $order_total)
	// {
		// $sql = 'SELECT * FROM '._DB_PREFIX_.'carrier_rule WHERE `id_country` = '.(int)$id_zone.' 
		// AND `id_reference` = '.(int)$id_reference.' AND `price` < '.floatval($order_total).' AND `price_max` > '.floatval($order_total);
		
		// return Db::getInstance()->ExecuteS($sql);
	// }

    /**
     * Render a twig template.
     */
    private function render(string $template, array $params = []): string
    {
        /** @var Twig_Environment $twig */
        $twig = $this->get('twig');

        return $twig->render($template, $params);
    }

    /**
     * Get path to this module's template directory
     */
    private function getModuleTemplatePath(): string
    {
        return sprintf('@Modules/%s/views/templates/admin/', $this->name);
    }
}
