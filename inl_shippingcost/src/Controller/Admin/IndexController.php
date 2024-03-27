<?php
/**
 * Copyright since 2007 PrestaShop SA and Contributors
 * PrestaShop is an International Registered Trademark & Property of PrestaShop SA
 *
 * NOTICE OF LICENSE
 *
 * This source file is subject to the Academic Free License version 3.0
 * that is bundled with this package in the file LICENSE.md.
 * It is also available through the world-wide-web at this URL:
 * https://opensource.org/licenses/AFL-3.0
 * If you did not receive a copy of the license and are unable to
 * obtain it through the world-wide-web, please send an email
 * to license@prestashop.com so we can send you a copy immediately.
 *
 * @author    PrestaShop SA and Contributors <contact@prestashop.com>
 * @copyright Since 2007 PrestaShop SA and Contributors
 * @license   https://opensource.org/licenses/AFL-3.0 Academic Free License version 3.0
 */

declare(strict_types=1);

namespace Module\Inl_shippingcost\Controller\Admin;

use Module\Inl_shippingcost\Grid\Definition\Factory\CarrierRuleGridDefinitionFactory;
use Module\Inl_shippingcost\Grid\Filters\CarrierRuleFilters;
use PrestaShopBundle\Controller\Admin\FrameworkBundleAdminController;
use PrestaShopBundle\Service\Grid\ResponseBuilder;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\HttpFoundation\Request;
use Module\Inl_shippingcost\Entity\CarrierRule;
use Symfony\Component\HttpFoundation\Response;
use Module\Inl_shippingcost\Presenter\CarriersPresenter;
use Module\Inl_shippingcost\Presenter\CarrierRulePresenter;
use Module\Inl_shippingcost\Repository\CarrierRepository;
use Module\Inl_shippingcost\Repository\CarrierRuleRepository;
use Context;

class IndexController extends FrameworkBundleAdminController
{
	const TAB_CLASS_NAME = 'AdminAdminInnlogGrid';
    /**
     * List quotes
     *
     * @param CarrierRuleFilters $filters
     *
     * @return Response
     */
    public function indexAction(CarrierRuleFilters $filters)
    {
        $quoteGridFactory = $this->get('inl_shippingcost.grid.factory.carrier_rule');
        $quoteGrid = $quoteGridFactory->getGrid($filters);

        return $this->render(
            '@Modules/inl_shippingcost/views/templates/admin/index.html.twig',
            [
                'enableSidebar' => true,
                'layoutTitle' => $this->trans('Liste règles transporteurs', 'Modules.Inl_shippingcost.Admin'),
                'quoteGrid' => $this->presentGrid($quoteGrid),
				'layoutHeaderToolbarBtn' => $this->getCarrierRuleToolbarButtons(),
            ]
        );
    }
	
	private function getCarrierRuleToolbarButtons(): array
    {
        $toolbarButtons = [];

        $isSingleShopContext = $this->get('prestashop.adapter.shop.context')->isSingleShopContext();

        $toolbarButtons['add'] = [
            'href' => $this->generateUrl('inl_shippingcost_create'),
            'desc' => $this->trans('Add new carrier rule', 'Modules.Inl_shippingcost.Admin'),
            'icon' => 'add_circle_outline',
            'disabled' => !$isSingleShopContext,
        ];

        if (!$isSingleShopContext) {
            $toolbarButtons['add']['help'] = $this->trans(
                'You can use this feature in a single shop context only. Switch context to enable it.',
                'Admin.Orderscustomers.Feature'
            );
            $toolbarButtons['add']['href'] = '#';
        }

        return $toolbarButtons;
    }
	
	private function getCarrierRuleToolbarButtonsReturn(): array
    {
        $toolbarButtons = [];

        $isSingleShopContext = $this->get('prestashop.adapter.shop.context')->isSingleShopContext();

        $toolbarButtons['return'] = [
            'href' => $this->generateUrl('inl_shippingcost_index'),
            'desc' => $this->trans('Retour', 'Modules.Inl_shippingcost.Admin'),
            // 'icon' => 'add_circle_outline',
            'disabled' => !$isSingleShopContext,
        ];

        if (!$isSingleShopContext) {
            $toolbarButtons['add']['help'] = $this->trans(
                'You can use this feature in a single shop context only. Switch context to enable it.',
                'Admin.Orderscustomers.Feature'
            );
            $toolbarButtons['add']['href'] = '#';
        }

        return $toolbarButtons;
    }
	
	public function createAction(Request $request): Response
    {
       $textFormDataHandler = $this->get(
        'prestashop.module.inl_shippingcost.form.carrier_rule_text_form_data_handler'
		);
		$textForm = $textFormDataHandler->getForm();
		$textForm->handleRequest($request);
		if ($textForm->isSubmitted() && $textForm->isValid()) {
			$errors = $textFormDataHandler->save($textForm->getData());
			if (empty($errors)) {
				$this->addFlash('success', 
					$this->trans('Successful update.', 'Admin.Notifications.Success')
				);
				return $this->redirectToRoute('inl_shippingcost_index');
			}
			$this->flashErrors($errors);
	   }
	   return $this->render(
		   '@Modules/inl_shippingcost/views/templates/admin/form.html.twig', 
		   ['carrierRule' => $textForm->createView(), 'layoutHeaderToolbarBtn' => $this->getCarrierRuleToolbarButtonsReturn(),]
	   );
    }
	
	public function deleteAction($id, Request $request): Response
    {
		$carrierRuleRepository = $this->get('prestashop.module.inl_shippingcost.repository.carrier_rule_repository');
		$carrierRulePresenter = $this->get('prestashop.module.inl_shippingcost.presenter.carrier_rule_presenter');

        $carrierRule = $carrierRuleRepository->findOneById((int)$id);
		if (!empty($carrierRule)) {
            $entityManager = $this->get('doctrine.orm.entity_manager');
			$entityManager->remove($carrierRule);
            $entityManager->flush();
            $this->addFlash(
                'success',
                $this->trans('Successful deletion.', 'Admin.Notifications.Success')
            );

            return $this->redirectToRoute('inl_shippingcost_index');
        }
    }
	
	public function editAction($id, Request $request): Response
    {
		$textFormDataHandler = $this->get(
        'prestashop.module.inl_shippingcost.form.carrier_rule_text_form_handler'
		);
		$carrierRuleRepository = $this->get('prestashop.module.inl_shippingcost.repository.carrier_rule_repository');
		$carrierRulePresenter = $this->get('prestashop.module.inl_shippingcost.presenter.carrier_rule_presenter');

        $carrierRule = $carrierRuleRepository->findOneById((int)$id);
		$carrier = $carrierRulePresenter->present($carrierRule, (int)Context::getContext()->language->id);
		
		$textForm = $textFormDataHandler->getFormCarrierRule($carrier);
		$textForm->handleRequest($request);
		
		
		// /** @var OrderSignatureRepository $signatureRepository */
        // $carrierRepository = $this->get('prestashop.module.inl_shippingcost.repository.carrier_rule_repository');

        /** @var OrderSignaturePresenter $signaturePresenter */
        // $carrierRulePresenter = $this->get('prestashop.module.inl_shippingcost.presenter.carrier_rule_presenter');

        // $carrierrule = $carrierRepository->findOneByOrderId(3);
		// var_dump($carrierRepository);
		// die();
		
		if ($textForm->isSubmitted() && $textForm->isValid()) {
			$errors = $textFormDataHandler->update($carrierRule, $textForm->getData(), $this->get('doctrine.orm.entity_manager'));
			if (empty($errors)) {
				$this->addFlash('success', 
					$this->trans('Successful update.', 'Admin.Notifications.Success')
				);
				return $this->redirectToRoute('inl_shippingcost_index');
			}
			$this->flashErrors($errors);
	   }
	   return $this->render(
		   '@Modules/inl_shippingcost/views/templates/admin/edit.html.twig', 
		   ['carrierRule' => $textForm->createView(), 'layoutHeaderToolbarBtn' => $this->getCarrierRuleToolbarButtonsReturn(),]
	   );
    }

    /**
     * Provides filters functionality.
     *
     * @param Request $request
     *
     * @return RedirectResponse
     */
    public function searchAction(Request $request)
    {
        /** @var ResponseBuilder $responseBuilder */
        $responseBuilder = $this->get('prestashop.bundle.grid.response_builder');

        return $responseBuilder->buildSearchResponse(
            $this->get('inl_shippingcost.grid.definition.factory.carrier_rule'),
            $request,
            CarrierRuleGridDefinitionFactory::GRID_ID,
            'inl_shippingcost_index'
        );
    }
}
