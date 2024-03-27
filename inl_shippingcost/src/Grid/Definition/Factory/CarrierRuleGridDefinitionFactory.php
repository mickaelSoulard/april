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

namespace Module\Inl_shippingcost\Grid\Definition\Factory;

use PrestaShop\PrestaShop\Core\Grid\Column\ColumnCollection;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\RowActionCollection;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\Common\ActionColumn;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\Type\LinkRowAction;
use PrestaShop\PrestaShop\Core\Grid\Action\Row\Type\SubmitRowAction;
use PrestaShop\PrestaShop\Core\Grid\Column\Type\DataColumn;
use PrestaShop\PrestaShop\Core\Grid\Definition\Factory\AbstractGridDefinitionFactory;
use PrestaShop\PrestaShop\Core\Grid\Filter\Filter;
use PrestaShop\PrestaShop\Core\Grid\Filter\FilterCollection;
use PrestaShopBundle\Form\Admin\Type\SearchAndResetType;
use Symfony\Component\Form\Extension\Core\Type\TextType;

class CarrierRuleGridDefinitionFactory extends AbstractGridDefinitionFactory
{
    const GRID_ID = 'carrierrule';

    /**
     * {@inheritdoc}
     */
    protected function getId()
    {
        return self::GRID_ID;
    }

    /**
     * {@inheritdoc}
     */
    protected function getName()
    {
        return $this->trans('Carrier rule', [], 'Modules.Inl_shippingcost.Admin');
    }
	
	/**
     * @return RowActionCollection
     */
    private function getRowActions()
    {
        return (new RowActionCollection())
            // ->add(
                // (new LinkRowAction('view'))
                // ->setName($this->trans('View', [], 'Admin.Actions'))
                // ->setIcon('zoom_in')
                // ->setOptions([
                    // 'route' => 'admin_categories_index',
                    // 'route_param_name' => 'categoryId',
                    // 'route_param_field' => 'id_category',
                    // 'accessibility_checker' => $this->categoryForViewAccessibilityChecker,
                    // // Thanks to this option a click on the row will have the same effect as this action
                    // 'clickable_row' => true,
                // ])
            // )
            ->add(
                (new LinkRowAction('edit'))
                ->setName($this->trans('Edit', [], 'Admin.Actions'))
                ->setIcon('edit')
                ->setOptions([
                    'route' => 'inl_shippingcost_edit',
                    'route_param_name' => 'ruleId',
                    'route_param_field' => 'id_rule',
                    // A grid usually has only one click action, categories are a special case because the view
                    // action may be filtered via the accessibility_checker option, in which case the edit action
                    // will be used The order is important then as the first row action is used by default
                    'clickable_row' => true,
                ])
            );
            // ->add((new SubmitRowAction('delete'))
                // ->setName($this->trans('Delete', [], 'Admin.Actions'))
                // ->setIcon('delete')
                // ->setOptions([
                    // 'method' => 'DELETE',
                    // 'route' => 'admin_categories_delete',
                    // 'route_param_name' => 'categoryId',
                    // 'route_param_field' => 'id_category',
                    // 'confirm_message' => $this->trans(
                        // 'Delete selected item?',
                        // [],
                        // 'Admin.Notifications.Warning'
                    // ),
                // ])
            // );
    }

    /**
     * {@inheritdoc}
     */
    protected function getColumns()
    {
        return (new ColumnCollection())
            ->add(
                (new DataColumn('id_rule'))
                    ->setOptions([
                        'field' => 'id_rule',
                    ])
            )
            ->add(
                (new DataColumn('id_carrier'))
                    ->setName($this->trans('ID carrier', [], 'Modules.Inl_shippingcost.Admin'))
                    ->setOptions([
                        'field' => 'id_carrier',
                    ])
            )
            ->add(
                (new DataColumn('id_reference'))
                    ->setName($this->trans('ID Reference', [], 'Modules.Inl_shippingcost.Admin'))
                    ->setOptions([
                        'field' => 'id_reference',
                    ])
            )
            ->add(
                (new DataColumn('id_country'))
                    ->setName($this->trans('Id country', [], 'Modules.Inl_shippingcost.Admin'))
                    ->setOptions([
                        'field' => 'id_country',
                    ])
            )
			->add(
                (new DataColumn('price_min'))
                    ->setName($this->trans('Price min', [], 'Modules.Inl_shippingcost.Admin'))
                    ->setOptions([
                        'field' => 'price',
                    ])
            )
			->add(
                (new DataColumn('price_max'))
                    ->setName($this->trans('Price max', [], 'Modules.Inl_shippingcost.Admin'))
                    ->setOptions([
                        'field' => 'price_max',
                    ])
            )->add(
                (new ActionColumn('actions'))
                ->setName($this->trans('Actions', [], 'Admin.Global'))
                ->setOptions([
                    'actions' => (new RowActionCollection())
                    ->add(
                        (new LinkRowAction('edit'))
                        ->setName('Edit')
                        ->setIcon('edit')
                        ->setOptions([
                            'route' => 'inl_shippingcost_edit',
                            'route_param_name' => 'id',
                            'route_param_field' => 'id_rule',
                            // A click on the row will have the same effect as this action
                            'clickable_row' => true,
                        ])
                    )
                    ->add(
                        (new SubmitRowAction('delete'))
                        ->setName('Delete')
                        ->setIcon('delete')
                        ->setOptions([
                            'confirm_message' => 'Delete selected item?',
                            'route' => 'inl_shippingcost_delete',
                            'route_param_name' => 'id',
                            'route_param_field' => 'id_rule',
                        ])
                    )
                ])
            );
    }

    /**
     * {@inheritdoc}
     */
    protected function getFilters()
    {
        return (new FilterCollection())
            ->add(
                (new Filter('id_rule', TextType::class))
                    ->setTypeOptions([
                        'required' => false,
                        'attr' => [
                            'placeholder' => $this->trans('ID', [], 'Admin.Global'),
                        ],
                    ])
                    ->setAssociatedColumn('id_rule')
            )
            ->add(
                (new Filter('id_carrier', TextType::class))
                    ->setTypeOptions([
                        'required' => false,
                        'attr' => [
                            'placeholder' => $this->trans('ID carrier', [], 'Modules.Inl_shippingcost.Admin'),
                        ],
                    ])
                    ->setAssociatedColumn('id_carrier')
            )
            ->add(
                (new Filter('id_reference', TextType::class))
                    ->setTypeOptions([
                        'required' => false,
                        'attr' => [
                            'placeholder' => $this->trans('ID reference', [], 'Modules.Inl_shippingcost.Admin'),
                        ],
                    ])
                    ->setAssociatedColumn('id_reference')
            )
			->add(
                (new Filter('id_country', TextType::class))
                    ->setTypeOptions([
                        'required' => false,
                        'attr' => [
                            'placeholder' => $this->trans('ID country', [], 'Modules.Inl_shippingcost.Admin'),
                        ],
                    ])
                    ->setAssociatedColumn('id_country')
            )
			->add(
                (new Filter('price_min', TextType::class))
                    ->setTypeOptions([
                        'required' => false,
                        'attr' => [
                            'placeholder' => $this->trans('Price min', [], 'Modules.Inl_shippingcost.Admin'),
                        ],
                    ])
                    ->setAssociatedColumn('price_min')
            )
			->add(
                (new Filter('price_max', TextType::class))
                    ->setTypeOptions([
                        'required' => false,
                        'attr' => [
                            'placeholder' => $this->trans('Price max', [], 'Modules.Inl_shippingcost.Admin'),
                        ],
                    ])
                    ->setAssociatedColumn('price_max')
            )
            ->add(
                (new Filter('actions', SearchAndResetType::class))
                    ->setTypeOptions([
                        'reset_route' => 'admin_common_reset_search_by_filter_id',
                        'reset_route_params' => [
                            'filterId' => self::GRID_ID,
                        ],
                        'redirect_route' => 'inl_shippingcost_index',
                    ])
                    ->setAssociatedColumn('actions')
            )
        ;
    }
}
